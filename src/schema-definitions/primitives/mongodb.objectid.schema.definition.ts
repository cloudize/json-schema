import { Schema } from 'jsonschema';
import { IJsonSchemaDefinition } from '../../index';

const regex = /[a-fA-F0-9]{24}/;

const MongodbObjectidSchemaDefinition: IJsonSchemaDefinition = class {
    static SchemaName = (context: any): string => '/core.mongodb.objectid.schema'

    static SchemaDefinition = (context: any): Schema => ({
      $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
      id: MongodbObjectidSchemaDefinition.SchemaName(context),
      title: 'Schema for a MongoDB ObjectId',
      description: 'Schema for use in the validation of a MongoDB ObjectId',
      type: 'string',
      minLength: 24,
      maxLength: 24,
      pattern: regex,
    })
}

export default MongodbObjectidSchemaDefinition;
