import { ValidationError, Validator } from 'jsonschema';
import { JsonElementType } from '@apigames/json';
import type { JsonSchemaDefinition } from './json.schema.definition';
export default class JsonSchemaValidator {
    private _validator;
    private _validationErrors;
    setupSchemaDependencies: (jsonSchemaDefinition: JsonSchemaDefinition) => void;
    setupSchema: (jsonSchemaDefinition: JsonSchemaDefinition) => void;
    setupValidator: () => void;
    teardownValidator: () => void;
    get validationErrors(): ValidationError[];
    get validator(): Validator;
    validate: (payloadDocument: JsonElementType, jsonSchemaDefinition: JsonSchemaDefinition) => boolean;
}
