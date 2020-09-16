const { JsonElementType } = require('@apigames/json');
const { Schema, ValidatorResult } = require('jsonschema');
const {
  JsonSchemaValidator,
  UuidSchemaDefinition,
  IpAddressSchemaDefinition
} = require('../../../../lib');

const TestSourceSchemaDefinition = class {
  static schemaName = () => '/test.source.schema';

  static setupSchemaDependencies(registerSchemaFunction) {
    registerSchemaFunction(IpAddressSchemaDefinition);
  };

  static schemaDefinition = () => ({
    $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
    id: TestSourceSchemaDefinition.schemaName(),
    title: 'Test Source Schema Definition',
    description: 'This class sets up an embedded schema definition for testing',
    type: 'object',
    properties: {
      ipAddress: { $ref: IpAddressSchemaDefinition.schemaName() }
    },
    additionalProperties: false,
    required: [ 'ipAddress' ]
  })
}

const TestSchemaDefinition = class {
  static schemaName = () => '/test.schema';

  static setupSchemaDependencies(registerSchemaFunction) {
    registerSchemaFunction(UuidSchemaDefinition);
    registerSchemaFunction(TestSourceSchemaDefinition);
  };

  static schemaDefinition = () => ({
    $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
    id: TestSchemaDefinition.schemaName(),
    title: 'Test Schema Definition',
    description: 'This class sets up a complex schema definition for testing',
    type: 'object',
    properties: {
      id: { $ref: UuidSchemaDefinition.schemaName() },
      name: { type: 'string' },
      source: { $ref: TestSourceSchemaDefinition.schemaName() }
    },
    additionalProperties: false,
    required: [ 'id', 'name', 'source' ]
  })

  static postSchemaValidation(payloadDocument, validationResult) {};
}

describe('The Test Schema Validator', () => {
  describe('should return false for', () => {
    it('an empty object', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({}, TestSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('an invalid object', () => {
      const payloadValidator = new JsonSchemaValidator();
      const payload = {
        id: 'x',
        name: 5,
        extended: false
      }
      expect(payloadValidator.validate(payload, TestSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
      expect(payloadValidator.validationErrors.length).toBe(5);
    });
  });

  describe('should return true for', () => {
    it('a valid object', () => {
      const payloadValidator = new JsonSchemaValidator();
      const payload = {
        id: '01234567-89ab-cdef-0123-456789abcdef',
        name: 'Bob Smith',
        source: {
          ipAddress: '127.0.0.1'
        }
      }

      TestSchemaDefinition.postSchemaValidation = jest.fn();

      expect(payloadValidator.validate(payload, TestSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
      expect(TestSchemaDefinition.postSchemaValidation).toHaveBeenCalled();
    });
  });
});
