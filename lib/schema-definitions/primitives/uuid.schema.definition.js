"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const regex = /^[{]{0,1}[0-9a-fA-F]{8}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{12}[}]{0,1}$/;
class UuidSchemaDefinition extends index_1.JsonSchemaDefinition {
    static schemaDefinition() {
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
exports.default = UuidSchemaDefinition;
UuidSchemaDefinition.schemaName = () => '/core.uuid.schema';
