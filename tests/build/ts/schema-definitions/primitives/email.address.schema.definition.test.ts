import { JsonSchemaValidator, EmailAddressSchemaDefinition } from '../../../../../lib';

it('Schema for System Email Address should have a proper name', () => {
  expect(EmailAddressSchemaDefinition.schemaName()).toBe('/core.email.address.schema');
});

describe('System Type Email Address validator', () => {
  describe('should return false for', () => {
    it('an empty Email Address', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('an Email Address without an @ symbol', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('bob', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('plainaddress', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('plainaddress', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('#@%^%#$@#$@#.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('#@%^%#$@#$@#.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('Joe Smith <email@domain.com>', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('Joe Smith <email@domain.com>', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email.domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email.domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@domain@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('.email@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('.email@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email.@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email.@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email..email@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email..email@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@domain.com (Joe Smith)', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain.com (Joe Smith)', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@-domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@-domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@111.222.333.44444', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@111.222.333.44444', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@domain..com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain..com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });
  });

  describe('should return true for', () => {
    it('email@domain', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a short email address', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('a@aa', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a short email address with dot domain', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('a@a.aa', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a long email address with dot domain', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('bob.the.legend@a.long.domain.name', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('あいうえお@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('あいうえお@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain.web', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain.web', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('firstname.lastname@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('firstname.lastname@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@subdomain.domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@subdomain.domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('firstname+lastname@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('firstname+lastname@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@123.123.123.123', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@123.123.123.123', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@[123.123.123.123]', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@[123.123.123.123]', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('"email"@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('"email"@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1234567890@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('1234567890@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain-one.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain-one.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('_______@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('_______@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain.name', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain.name', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain.co.jp', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('email@domain.co.jp', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('firstname-lastname@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('firstname-lastname@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('joe@localhost', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('joe@localhost', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('root@bastion', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate('root@bastion', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });
  });
});
