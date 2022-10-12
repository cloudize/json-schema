// eslint-disable-next-line max-classes-per-file
import { Schema, ValidatorResult } from 'jsonschema';
import {
  IJsonSchemaDefinition,
  JsonSchemaValidator,
  UuidSchemaDefinition,
  IpAddressSchemaDefinition,
  SetupSchemaDependenciesFunction,
} from '../../../src';

let TestSchemaDefinitionContext;
let TestSourceSchemaDefinitionContext;

// eslint-disable-next-line import/prefer-default-export
const TestSourceSchemaDefinition: IJsonSchemaDefinition = class {
  // eslint-disable-next-line no-unused-vars
  static SchemaName = (context: any): string => '/test.source.schema';

  static SetupSchemaDependencies(registerSchemaFunction: SetupSchemaDependenciesFunction, context: any): void {
    registerSchemaFunction(IpAddressSchemaDefinition, context);
  }

  static SchemaDefinition = (context: any): Schema => {
    TestSourceSchemaDefinitionContext = context;
    return {
      $schema: 'http://json-schema.org/draft-06/schema#',
      id: TestSourceSchemaDefinition.SchemaName(context),
      title: 'Test Source Schema Definition',
      description: 'This class sets up an embedded schema definition for testing',
      type: 'object',
      properties: {
        ipAddress: { $ref: IpAddressSchemaDefinition.SchemaName(context) },
      },
      additionalProperties: false,
      required: ['ipAddress'],
    };
  };
};

// eslint-disable-next-line import/prefer-default-export
const TestSchemaDefinition: IJsonSchemaDefinition = class {
  // eslint-disable-next-line no-unused-vars
  static SchemaName = (context: any): string => '/test.schema';

  static SetupSchemaDependencies(registerSchemaFunction: SetupSchemaDependenciesFunction, context: any): void {
    registerSchemaFunction(UuidSchemaDefinition, context);
    registerSchemaFunction(TestSourceSchemaDefinition, context);
  }

  static SchemaDefinition = (context: any): Schema => {
    TestSchemaDefinitionContext = context;
    return {
      $schema: 'http://json-schema.org/draft-06/schema#',
      id: TestSchemaDefinition.SchemaName(context),
      title: 'Test Schema Definition',
      description: 'This class sets up a complex schema definition for testing',
      type: 'object',
      properties: {
        id: { $ref: UuidSchemaDefinition.SchemaName(context) },
        name: { type: 'string' },
        source: { $ref: TestSourceSchemaDefinition.SchemaName(context) },
      },
      additionalProperties: false,
      required: ['id', 'name', 'source'],
    };
  };

  // eslint-disable-next-line no-unused-vars
  static PostSchemaValidation(payloadDocument: any, validationResult: ValidatorResult): void {}
};

describe('The Test Schema Validator', () => {
  describe('should return false for', () => {
    it('an undefined object', () => {
      TestSchemaDefinitionContext = undefined;
      TestSourceSchemaDefinitionContext = undefined;
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate(undefined, TestSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('an empty object', () => {
      TestSchemaDefinitionContext = undefined;
      TestSourceSchemaDefinitionContext = undefined;
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate({}, TestSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('an invalid object', () => {
      TestSchemaDefinitionContext = undefined;
      TestSourceSchemaDefinitionContext = undefined;
      const payloadValidator = new JsonSchemaValidator();
      const payload = {
        id: 'x',
        name: 5,
        extended: false,
      };
      const context = {};

      expect(payloadValidator.Validate(payload, TestSchemaDefinition, context)).toBe(false);
      expect(TestSchemaDefinitionContext).toBe(context);
      expect(TestSourceSchemaDefinitionContext).toBe(context);
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
          ipAddress: '127.0.0.1',
        },
      };
      const context = {};

      TestSchemaDefinition.PostSchemaValidation = jest.fn();

      expect(payloadValidator.Validate(payload, TestSchemaDefinition, context)).toBe(true);
      expect(TestSchemaDefinitionContext).toBe(context);
      expect(TestSourceSchemaDefinitionContext).toBe(context);
      expect(payloadValidator.validationErrors).toBeUndefined();
      expect(TestSchemaDefinition.PostSchemaValidation).toHaveBeenCalled();
    });
  });
});
