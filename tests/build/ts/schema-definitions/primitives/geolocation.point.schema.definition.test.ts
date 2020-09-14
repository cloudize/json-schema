import { JsonSchemaValidator, GeolocationPointSchemaDefinition } from '../../../../../lib';

it('Schema for System GeoLocation Point should have a proper name', () => {
  expect(GeolocationPointSchemaDefinition.schemaName()).toBe('/core.geolocation.point.schema');
});

describe('System GeoLocation Point schema validator', () => {
  describe('should return false for', () => {
    it('an empty object {}', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({}, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it("an object without a 'type' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({ coordinates: [0, 0] }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it("an object without a 'coordinates' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({ type: 'Point' }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it("an object with an invalid 'type' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Guess',
        coordinates: [0, 0],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it("an object with an invalid 'coordinates' element - string types", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: ['abc', 'xyz'],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(" an object with an invalid 'coordinates' element - boolean types", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: [true, false],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(" an object with an invalid 'coordinates' element - 0 dimentions", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: [],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(" an object with an invalid 'coordinates' element - 1 dimention", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: [0],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(" an object with an invalid 'coordinates' element - 3 dimentions", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: [0, 0, 0],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(" an object with an out of bounds negative longitude 'coordiate' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: [-180.0001, 0],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(" an object with an out of bounds positive longitude 'coordiate' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: [180.0001, 0],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(" an object with an out of bounds negative latitude 'coordiate' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: [0, -90.0001],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(" an object with an out of bounds positive latitude 'coordiate' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({
        type: 'Point',
        coordinates: [0, 90.0001],
      }, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('an otherwise valid object with an additional random property that is not defined in the schema', () => {
      const payloadDocument = {
        type: 'Point',
        coordinates: [
          0,
          0,
        ],
        randomLink: 'https://www.random.com/',
      };
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate(payloadDocument, GeolocationPointSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });
  });

  describe('should return true for', () => {
    it("an object with an valid 'coordinates' element - 2 dimentions", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({ type: 'Point', coordinates: [0, 0] }, GeolocationPointSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it(" an object with an on the edge negative longitude 'coordiate' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({ type: 'Point', coordinates: [-180, 0] }, GeolocationPointSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it(" an object with an on the edge positive longitude 'coordiate' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({ type: 'Point', coordinates: [180, 0] }, GeolocationPointSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it(" an object with an on the edge negative latitude 'coordiate' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({ type: 'Point', coordinates: [0, -90] }, GeolocationPointSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it(" an object with an on the edge positive latitude 'coordiate' element", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.validate({ type: 'Point', coordinates: [0, 90] }, GeolocationPointSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });
  });
});
