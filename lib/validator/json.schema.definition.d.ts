import { Schema, ValidatorResult } from 'jsonschema';
import { JsonElementType } from '@apigames/json';
export declare type setupSchemaDependenciesFunction = (schemaDefinition: JsonSchemaDefinition) => void;
export interface JsonSchemaDefinition {
    schemaName(): string;
    setupSchemaDependencies?(registerSchemaFunction: setupSchemaDependenciesFunction): void;
    schemaDefinition(): Schema;
    postSchemaValidation?(payloadDocument: JsonElementType, validationResult: ValidatorResult): void;
}
