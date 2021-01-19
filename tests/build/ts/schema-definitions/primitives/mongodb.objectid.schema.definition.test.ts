import { JsonSchemaValidator, MongoDBObjectIdSchemaDefinition } from '../../../../../lib';

it('Schema for System MongoDB ObjectId should have a proper name', () => {
  expect(MongoDBObjectIdSchemaDefinition.SchemaName('test')).toBe('/core.mongodb.objectid.schema');
});

describe('Generic MongoDB ObjectId schema validator', () => {
  describe('should return false for', () => {
    it('an empty string', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('', MongoDBObjectIdSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('a string with less than 24 characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('abcde12345abcde12345abc', MongoDBObjectIdSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('a string with more than 24 characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('abcde12345abcde12345abcde', MongoDBObjectIdSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('a string with invalid characters (outside of a-fA-F0-9 pattern)', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('abcdefghijklmnopqrstuvwx', MongoDBObjectIdSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });
  });

  describe('should return true for', () => {
    it('a string with 24 characters legal characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('abcde12345ABCDE56789fbcF', MongoDBObjectIdSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });
  });
});
