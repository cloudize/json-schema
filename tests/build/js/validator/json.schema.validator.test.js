const { JsonElementType } = require('@apigames/json');
const { Schema, ValidatorResult } = require('jsonschema');
const {
  JsonSchemaValidator,
  UuidSchemaDefinition,
  IpAddressSchemaDefinition
} = require('../../../../lib');

let TestSchemaDefinitionContext = undefined;
let TestSourceSchemaDefinitionContext = undefined;

const TestSourceSchemaDefinition = class {
  static schemaName = (context) => '/test.source.schema';

  static setupSchemaDependencies(registerSchemaFunction, context) {
    registerSchemaFunction(IpAddressSchemaDefinition, context);
  };

  static schemaDefinition = (context) => {
    TestSourceSchemaDefinitionContext = context;
    return {
      $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
        id: TestSourceSchemaDefinition.schemaName(context),
      title: 'Test Source Schema Definition',
      description: 'This class sets up an embedded schema definition for testing',
      type: 'object',
      properties: {
      ipAddress: { $ref: IpAddressSchemaDefinition.schemaName(context) }
    },
      additionalProperties: false,
        required: [ 'ipAddress' ]
    }
  }
}

const TestSchemaDefinition = class {
  static schemaName = (context) => '/test.schema';

  static setupSchemaDependencies(registerSchemaFunction, context) {
    registerSchemaFunction(UuidSchemaDefinition, context);
    registerSchemaFunction(TestSourceSchemaDefinition, context);
  };

  static schemaDefinition = (context) => {
    TestSchemaDefinitionContext = context;
    return {
      $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
      id: TestSchemaDefinition.schemaName(context),
      title: 'Test Schema Definition',
      description: 'This class sets up a complex schema definition for testing',
      type: 'object',
      properties: {
        id: { $ref: UuidSchemaDefinition.schemaName(context) },
        name: { type: 'string' },
        source: { $ref: TestSourceSchemaDefinition.schemaName(context) }
      },
      additionalProperties: false,
      required: [ 'id', 'name', 'source' ]
    }
  }

  static postSchemaValidation(payloadDocument, validationResult) {};
}

describe('The Test Schema Validator', () => {
  describe('should return false for', () => {
    it('an empty object', () => {
      TestSchemaDefinitionContext = undefined;
      TestSourceSchemaDefinitionContext = undefined;
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({}, TestSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('an invalid object', () => {
      TestSchemaDefinitionContext = undefined;
      TestSourceSchemaDefinitionContext = undefined;
      const payloadValidator = new JsonSchemaValidator();
      const payload = {
        id: 'x',
        name: 5,
        extended: false
      }
      const context = {};

      expect(payloadValidator.validate(payload, TestSchemaDefinition, context)).toBe(false);
      expect(TestSchemaDefinitionContext).toBe(context)
      expect(TestSourceSchemaDefinitionContext).toBe(context)
      expect(payloadValidator.validationErrors).toBeDefined();
      expect(payloadValidator.validationErrors.length).toBe(5);
    });
  });

  describe('should return true for', () => {
    it('a valid object', () => {
      TestSchemaDefinitionContext = undefined;
      TestSourceSchemaDefinitionContext = undefined;
      const payloadValidator = new JsonSchemaValidator();
      const payload = {
        id: '01234567-89ab-cdef-0123-456789abcdef',
        name: 'Bob Smith',
        source: {
          ipAddress: '127.0.0.1'
        }
      }
      const context = {};

      TestSchemaDefinition.postSchemaValidation = jest.fn();

      expect(payloadValidator.validate(payload, TestSchemaDefinition, context)).toBe(true);
      expect(TestSchemaDefinitionContext).toBe(context)
      expect(TestSourceSchemaDefinitionContext).toBe(context)
      expect(payloadValidator.validationErrors).toBeUndefined();
      expect(TestSchemaDefinition.postSchemaValidation).toHaveBeenCalled();
    });
  });
});
