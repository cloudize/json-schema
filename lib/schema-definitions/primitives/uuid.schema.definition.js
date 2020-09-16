"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const regex = /^[{]{0,1}[0-9a-fA-F]{8}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{4}[-]{0,1}[0-9a-fA-F]{12}[}]{0,1}$/;
const UuidSchemaDefinition = (_a = class {
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
    },
    _a.schemaName = () => '/core.uuid.schema',
    _a);
exports.default = UuidSchemaDefinition;
