import { Schema } from 'jsonschema';
import { IJsonSchemaDefinition } from '../../index';

// eslint-disable-next-line max-len
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?![-.])((\[?[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]?)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})|(([a-zA-Z\-0-9]+){2,}))$/ig;

const EmailAddressSchemaDefinition: IJsonSchemaDefinition = class {
  // eslint-disable-next-line no-unused-vars
  static SchemaName = (context: any): string => '/core.email.address.schema';

  static SchemaDefinition = (context: any): Schema => ({
    $schema: 'http://json-schema.org/draft-06/schema#',
    id: EmailAddressSchemaDefinition.SchemaName(context),
    title: 'Schema for an email address',
    description: 'Schema for use in the validation of the email address',
    type: 'string',
    minLength: 3,
    pattern: regex,
  });
};

export default EmailAddressSchemaDefinition;
