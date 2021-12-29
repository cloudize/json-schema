import { Schema } from 'jsonschema';
import { IJsonSchemaDefinition } from '../../index';

const DatetimeSchemaDefinition: IJsonSchemaDefinition = class {
  // eslint-disable-next-line no-unused-vars
  static SchemaName = (context: any): string => '/core.datetime.schema';

  static SchemaDefinition = (context: any): Schema => ({
    $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
    id: DatetimeSchemaDefinition.SchemaName(context),
    title: 'Schema for a date and time',
    description: 'Schema for use in the validation of an ISO8601 date and time',
    type: 'string',
    minLength: 22,
    maxLength: 29,
    pattern: '^([1-2][0-9]{3})' // year
        + '(-)' // date separator
        + '((0[1-9])|(1[0-2]))' // month
        + '(-)' // date separator
        + '((0[1-9])|([1-2][0-9])|(3[0-1]))' // day
        + '(T)' // date time separator
        + '(([0-1][0-9])|(2[0-3]))' // hours
        + '(:)' // time separator
        + '([0-5][0-9])' // minutes
        + '(:)' // time separator
        + '([0-5][0-9])' // seconds
        + '(\\.)' // millisecond separator
        + '([0-9]{1,3})' // milliseonds
        + '('
        + '(Z)' // UTC Indicator
        + '|'
        + '(-(((0[0-9]|1[0-1])[:]?[0-5][0-9])|(12[:]?00)))' // Western Timezones
        + '|'
        + '(\\+(((0[0-9]|1[0-3])[:]?[0-5][0-9])|(14[:]?00)))' // Eastern Timezones
        + ')$',
  });
};

export default DatetimeSchemaDefinition;
