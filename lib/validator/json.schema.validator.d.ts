import { ValidationError, Validator } from 'jsonschema';
import type { IJsonSchemaDefinition } from './json.schema.definition';
export default class JsonSchemaValidator {
    private _validator;
    private _validationErrors;
    setupSchemaDependencies: (schemaDefinition: IJsonSchemaDefinition) => void;
    setupSchema: (schemaDefinition: IJsonSchemaDefinition) => void;
    setupValidator: () => void;
    teardownValidator: () => void;
    get validationErrors(): ValidationError[];
    get validator(): Validator;
    validate: (payloadDocument: any, schemaDefinition: IJsonSchemaDefinition) => boolean;
}
