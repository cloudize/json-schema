import { Schema } from 'jsonschema';
import { JsonSchemaDefinition } from '../../index';

const regex = /[a-fA-F0-9]{24}/;

const MongodbObjectidSchemaDefinition: JsonSchemaDefinition = class {
    static schemaName = (): string => '/core.mongodb.objectid.schema'

    static schemaDefinition = (): Schema => ({
      $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
      id: MongodbObjectidSchemaDefinition.schemaName(),
      title: 'Schema for a MongoDB ObjectId',
      description: 'Schema for use in the validation of a MongoDB ObjectId',
      type: 'string',
      minLength: 24,
      maxLength: 24,
      pattern: regex,
    })
}

export default MongodbObjectidSchemaDefinition;
