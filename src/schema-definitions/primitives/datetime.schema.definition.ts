import { Schema } from 'jsonschema';
import { IJsonSchemaDefinition } from '../../index';

const DatetimeSchemaDefinition: IJsonSchemaDefinition = class {
    static schemaName = (): string => '/core.datetime.schema'

    static schemaDefinition = (): Schema => ({
      $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
      id: DatetimeSchemaDefinition.schemaName(),
      title: 'Schema for a date and time',
      description: 'Schema for use in the validation of an ISO8601 date and time',
      type: 'string',
      minLength: 22,
      maxLength: 29,
      pattern: '^([1-2][0-9]{3})' // year
        + '(-((0[1-9])|(1[0-2])))' // month
        + '(-((0[1-9])|([1-2][0-9])|(3[0-1])))' // day
        + '(T)' // beginning of a time section
        + '((([0-1][0-9])|(2[0-3])):)' // hours
        + '([0-5][0-9]:)' // minutes
        + '([0-5][0-9])' // seconds
        + '(\\.[0-9]{1,3})' // milliseconds
        // timezone (Z or -12:00 to +14:00)
        + '(Z|(-(((0[0-9]|1[0-1])[:]?[0-5][0-9])|(12[:]?00)))|(\\+(((0[0-9]|1[0-3])[:]?[0-5][0-9])|(14[:]?00))))$',
    });
}

export default DatetimeSchemaDefinition;
