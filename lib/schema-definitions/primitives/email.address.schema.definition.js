"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?![-.])((\[?[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]?)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})|(([a-zA-Z\-0-9]+){2,}))$/ig;
const EmailAddressSchemaDefinition = (_a = class {
    },
    _a.schemaName = () => '/core.email.address.schema',
    _a.schemaDefinition = () => ({
        $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
        id: EmailAddressSchemaDefinition.schemaName(),
        title: 'Schema for an email address',
        description: 'Schema for use in the validation of the email address',
        type: 'string',
        minLength: 3,
        pattern: regex,
    }),
    _a);
exports.default = EmailAddressSchemaDefinition;
