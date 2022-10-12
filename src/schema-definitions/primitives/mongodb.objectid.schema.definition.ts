import { Schema } from 'jsonschema';
import { IJsonSchemaDefinition } from '../../index';

const regex = /[a-fA-F0-9]{24}/;

const MongodbObjectidSchemaDefinition: IJsonSchemaDefinition = class {
  // eslint-disable-next-line no-unused-vars
  static SchemaName = (context: any): string => '/core.mongodb.objectid.schema';

  static SchemaDefinition = (context: any): Schema => ({
    $schema: 'http://json-schema.org/draft-06/schema#',
    id: MongodbObjectidSchemaDefinition.SchemaName(context),
    title: 'Schema for a MongoDB ObjectId',
    description: 'Schema for use in the validation of a MongoDB ObjectId',
    type: 'string',
    minLength: 24,
    maxLength: 24,
    pattern: regex,
  });
};

export default MongodbObjectidSchemaDefinition;
