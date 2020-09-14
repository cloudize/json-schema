import { JsonSchemaValidator, UuidSchemaDefinition } from '../../../../src';

it('Schema for System UUID should have a proper name', () => {
  expect(UuidSchemaDefinition.schemaName()).toBe('/core.uuid.schema');
});

describe('Generic UUID schema validator', () => {
  describe('should return false for', () => {
    it('an empty string', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('', UuidSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('a string with less than 32 characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('0123456789abcdef0123456789abcde', UuidSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('a string with more than 38 characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('0123456789abcdef0123456789abcdef1234567', UuidSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('a string with invalid characters (outside of a-fA-F0-9 pattern)', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('0123456789abcdef0123456789abcdex', UuidSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });
  });

  describe('should return true for', () => {
    it('a string with 32 characters legal characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('0123456789abcdef0123456789abcdef', UuidSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a string with 36 characters legal characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('01234567-89ab-cdef-0123-456789abcdef', UuidSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a string with 36 characters legal uppercase characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('01234567-89AB-CDEF-0123-456789ABCDEF', UuidSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a string with 38 characters legal characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('{01234567-89ab-cdef-0123-456789abcdef}', UuidSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a string with 38 characters legal uppercase characters', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('{01234567-89AB-CDEF-0123-456789ABCDEF}', UuidSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });
  });
});
