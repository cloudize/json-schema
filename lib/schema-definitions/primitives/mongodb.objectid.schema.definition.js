"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const regex = /[a-fA-F0-9]{24}/;
class MongodbObjectidSchemaDefinition extends index_1.JsonSchemaDefinition {
}
exports.default = MongodbObjectidSchemaDefinition;
MongodbObjectidSchemaDefinition.schemaName = () => '/core.mongodb.objectid.schema';
MongodbObjectidSchemaDefinition.schemaDefinition = () => ({
    $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
    id: MongodbObjectidSchemaDefinition.schemaName(),
    title: 'Schema for a MongoDB ObjectId',
    description: 'Schema for use in the validation of a MongoDB ObjectId',
    type: 'string',
    minLength: 24,
    maxLength: 24,
    pattern: regex,
});
