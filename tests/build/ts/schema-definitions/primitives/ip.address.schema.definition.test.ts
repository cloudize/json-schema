import { JsonSchemaValidator, IpAddressSchemaDefinition } from '../../../../../lib';

it('Schema for System IP Address should have a proper name', () => {
  expect(IpAddressSchemaDefinition.SchemaName('test')).toBe('/core.ip.address.schema');
});

describe('System Type IP Address validator', () => {
  describe('should return false for', () => {
    it('an empty IP Address', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('123', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('123', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('123.123', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('123.123', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('123.123.123', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('123.123.123', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('256.256.256.256', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('256.256.256.256', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('30.168.1.255.1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('30.168.1.255.1', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('127.1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('127.1', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('192.168.1.256', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('192.168.1.256', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('-1.2.3.4', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('-1.2.3.4', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('3...3', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('3...3', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('1::88888', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::88888', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('1::12fg', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::12fg', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('1:2:3:4:5:6:7:8:9', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6:7:8:9', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('1:2:3:4:5:6::7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6::7:8', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(':1:2:3:4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate(':1:2:3:4:5:6:7:8', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('1:2:3:4:5:6:7:8:', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6:7:8:', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('::1:2:3:4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('::1:2:3:4:5:6:7:8', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('1:2:3:4:5:6:7:8::', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6:7:8::', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('1:2:3:4:5:6:7:88888', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6:7:88888', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('2001:db8:3:4:5::192.0.2.33', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('2001:db8:3:4:5::192.0.2.33', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('fe80::7:8%', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('fe80::7:8%', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('fe80::7:8i', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('fe80::7:8i', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('fe80::7:8interface', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('fe80::7:8interface', IpAddressSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });
  });

  describe('should return true for', () => {
    it('127.0.0.1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('127.0.0.1', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('192.168.1.1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('192.168.1.1', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('192.168.1.255', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('192.168.1.255', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('255.255.255.255', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('255.255.255.255', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('0.0.0.0', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('0.0.0.0', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1.1.1.01', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1.1.1.01', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3:4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3:4:5:6:7::', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6:7::', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3:4:5:6::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3:4:5:6::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5:6::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3:4:5::7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5::7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3:4:5::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4:5::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3:4::6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4::6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3:4::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3:4::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3::5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3::5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2:3::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2:3::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::4:5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2::4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2::4:5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1:2::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1:2::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::3:4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::3:4:5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::3:4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::3:4:5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('1::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('::2:3:4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('::2:3:4:5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('::2:3:4:5:6:7:8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('::2:3:4:5:6:7:8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('::8', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('::8', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('::', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('::', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('fe80::7:8%eth0', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('fe80::7:8%eth0', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('fe80::7:8%1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('fe80::7:8%1', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('::255.255.255.255', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('::255.255.255.255', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('::ffff:255.255.255.255', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('::ffff:255.255.255.255', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('::ffff:0:255.255.255.255', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('::ffff:0:255.255.255.255', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('2001:db8:3:4::192.0.2.33', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('2001:db8:3:4::192.0.2.33', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('64:ff9b::192.0.2.33', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('64:ff9b::192.0.2.33', IpAddressSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });
  });
});
