import { Schema } from 'jsonschema';
import { JsonSchemaDefinition } from '../../index';
export default class EmailAddressSchemaDefinition extends JsonSchemaDefinition {
    static schemaName: () => string;
    static schemaDefinition: () => Schema;
}
