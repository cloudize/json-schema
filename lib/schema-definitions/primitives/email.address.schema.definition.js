"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?![-.])((\[?[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]?)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})|(([a-zA-Z\-0-9]+){2,}))$/ig;
class EmailAddressSchemaDefinition extends index_1.JsonSchemaDefinition {
}
exports.default = EmailAddressSchemaDefinition;
EmailAddressSchemaDefinition.schemaName = () => '/core.email.address.schema';
EmailAddressSchemaDefinition.schemaDefinition = () => ({
    $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
    id: EmailAddressSchemaDefinition.schemaName(),
    title: 'Schema for an email address',
    description: 'Schema for use in the validation of the email address',
    type: 'string',
    minLength: 3,
    pattern: regex,
});
