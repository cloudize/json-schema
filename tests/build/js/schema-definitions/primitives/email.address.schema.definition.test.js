const thisModule = require('../../../../../lib');

const { JsonSchemaValidator, EmailAddressSchemaDefinition } = thisModule;

it('Schema for System Email Address should have a proper name', () => {
  expect(EmailAddressSchemaDefinition.SchemaName('test')).toBe('/core.email.address.schema');
});

describe('System Type Email Address validator', () => {
  describe('should return false for', () => {
    it('an empty Email Address', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('an Email Address without an @ symbol', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('bob', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('plainaddress', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('plainaddress', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('#@%^%#$@#$@#.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('#@%^%#$@#$@#.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('Joe Smith <email@domain.com>', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('Joe Smith <email@domain.com>', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email.domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email.domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@domain@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('.email@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('.email@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email.@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email.@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email..email@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email..email@domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@domain.com (Joe Smith)', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain.com (Joe Smith)', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@-domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@-domain.com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@111.222.333.44444', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@111.222.333.44444', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('email@domain..com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain..com', EmailAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });
  });

  describe('should return true for', () => {
    it('email@domain', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a short email address', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('a@aa', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a short email address with dot domain', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('a@a.aa', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a long email address with dot domain', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('bob.the.legend@a.long.domain.name', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('あいうえお@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('あいうえお@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain.web', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain.web', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('firstname.lastname@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('firstname.lastname@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@subdomain.domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@subdomain.domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('firstname+lastname@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('firstname+lastname@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@123.123.123.123', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@123.123.123.123', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@[123.123.123.123]', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@[123.123.123.123]', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('"email"@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('"email"@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1234567890@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1234567890@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain-one.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain-one.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('_______@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('_______@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain.name', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain.name', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('email@domain.co.jp', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('email@domain.co.jp', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('firstname-lastname@domain.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('firstname-lastname@domain.com', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('joe@localhost', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('joe@localhost', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('root@bastion', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('root@bastion', EmailAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });
  });
});
