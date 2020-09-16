"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const regex = /[a-fA-F0-9]{24}/;
const MongodbObjectidSchemaDefinition = (_a = class {
    },
    _a.schemaName = () => '/core.mongodb.objectid.schema',
    _a.schemaDefinition = () => ({
        $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
        id: MongodbObjectidSchemaDefinition.schemaName(),
        title: 'Schema for a MongoDB ObjectId',
        description: 'Schema for use in the validation of a MongoDB ObjectId',
        type: 'string',
        minLength: 24,
        maxLength: 24,
        pattern: regex,
    }),
    _a);
exports.default = MongodbObjectidSchemaDefinition;
