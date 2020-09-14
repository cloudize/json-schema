import { ValidationError, Validator } from 'jsonschema';
import { JsonElementType } from '@apigames/json';
import type { JsonSchemaDefinitionClass } from './json.schema.definition';
export default class JsonSchemaValidator {
    private _validator;
    private _validationErrors;
    setupSchemaDependencies: (jsonSchemaDefinition: JsonSchemaDefinitionClass) => void;
    setupSchema: (jsonSchemaDefinition: JsonSchemaDefinitionClass) => void;
    setupValidator: () => void;
    teardownValidator: () => void;
    get validationErrors(): ValidationError[];
    get validator(): Validator;
    validate: (payloadDocument: JsonElementType, jsonSchemaDefinition: JsonSchemaDefinitionClass) => boolean;
}
