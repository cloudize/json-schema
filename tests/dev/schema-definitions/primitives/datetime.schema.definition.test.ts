import { JsonSchemaValidator, DatetimeSchemaDefinition } from '../../../../src';

it('Schema for generic date-time should have a proper name', () => {
  expect(DatetimeSchemaDefinition.SchemaName('test')).toBe('/core.datetime.schema');
});

describe('Generic DateTime validator', () => {
  describe('should return false for', () => {
    describe('an incorrect length DateTime string', () => {
      it('shorter than 22 chars', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2011-10-05T14:48:00.Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('longer than 29 chars', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2011-10-05T14:48:00.000+12:000', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });
    });

    describe('a date-time with an incorrect month', () => {
      it('21', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-21-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('13', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-13-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-00-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });
    });

    describe('a date-time with an incorrect day', () => {
      it('32', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-32T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-00T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('99', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-99T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });
    });

    describe('a date-time with an incorrect hour', () => {
      it('24', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T24:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('30', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T24:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });
    });

    describe('a date-time with an incorrect minutes', () => {
      it('60', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:60:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('99', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:99:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });
    });

    describe('a date-time with an incorrect seconds', () => {
      it('60', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:60.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('99', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:99.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });
    });

    describe('incorrect timezone', () => {
      it('Not Z', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000X', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('not + or -', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000=12:00', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('hours more than +14', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000+15:00', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('hours more than -12', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000-13:00', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('more than -12:00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000-12:01', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('more than +14:00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000+14:01', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('minutes more than 59', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000+13:60', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });
    });

    describe('other cases', () => {
      it('an empty DateTime string', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('a date-time without T', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-01-01000:00:00.000Z', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });

      it('a date-time without Z', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-01-01T00:00:00.000', DatetimeSchemaDefinition)).toBe(false);
        expect(payloadValidator.validationErrors).toBeDefined();
      });
    });
  });

  describe('should return true for', () => {
    it('a valid date-time', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('2011-10-05T14:48:00.000Z', DatetimeSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('a valid date-time with sec/ms at the edge', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('2020-12-31T23:59:59.999Z', DatetimeSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it("a date-time in 1990's", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('1991-01-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    describe('a date-time with a correct month', () => {
      it('01', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-01-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('09', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-09-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('10', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-10-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('12', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });
    });

    describe('a date-time with a correct day', () => {
      it('01', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('09', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-09T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('10', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-10T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('19', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-19T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('20', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-20T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('29', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-29T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('30', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-30T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('31', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-31T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });
    });

    describe('a date-time with a correct hour', () => {
      it('00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T00:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('01', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('09', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T09:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('10', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T10:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('19', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T19:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('20', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T20:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('23', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T23:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });
    });

    describe('a date-time with a correct minute', () => {
      it('00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('09', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:09:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('10', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:10:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('21', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:21:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('32', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:32:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('43', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:43:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('59', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:59:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });
    });

    describe('a date-time with a correct second', () => {
      it('00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('09', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:09.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('10', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:10.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('21', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:21.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('32', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:32.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('43', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:43.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('59', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:59.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });
    });

    describe('a date-time with a correct millisecond', () => {
      it('000', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('5', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.5Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('67', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.67Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('345', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.345Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('999', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });
    });

    describe('a date-time with a correct timezone', () => {
      it('Z', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.000Z', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('+12:00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999+12:00', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('+13:59', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999+13:59', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('+14:00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999+14:00', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('-12:00', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999-12:00', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('-11:59', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999-11:59', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('+1200', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999+1200', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('+1359', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999+1359', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('+1400', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999+1400', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('-1200', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999-1200', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });

      it('-1159', () => {
        const payloadValidator = new JsonSchemaValidator();
        expect(payloadValidator.Validate('2010-12-01T01:00:00.999-1159', DatetimeSchemaDefinition)).toBe(true);
        expect(payloadValidator.validationErrors).toBeUndefined();
      });
    });
  });
});
