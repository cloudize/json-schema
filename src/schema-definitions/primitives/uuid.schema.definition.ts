import { Schema } from 'jsonschema';
import { JsonSchemaDefinition } from '../../index';

// eslint-disable-next-line max-len
const regex = /^[{]{0,1}[0-9a-fA-F]{8}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{12}[}]{0,1}$/;

export default class UuidSchemaDefinition extends JsonSchemaDefinition {
    static schemaName = (): string => '/core.uuid.schema';

    static schemaDefinition(): Schema {
      return {
        $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
        id: UuidSchemaDefinition.schemaName(),
        title: 'Schema for a UUID',
        description: 'Schema for use in the validation of a UUID',
        type: 'string',
        minLength: 32,
        maxLength: 38,
        pattern: regex,
      };
    }
}
