import { Schema, ValidatorResult } from 'jsonschema';
import { JsonElementType } from '@apigames/json';
export declare type setupSchemaDependenciesFunction = (schemaDefinition: JsonSchemaDefinitionClass) => void;
export default class JsonSchemaDefinition {
    static schemaName(): string;
    static setupSchemaDependencies?(registerSchemaFunction: setupSchemaDependenciesFunction): void;
    static schemaDefinition(): Schema;
    static postSchemaValidation?(payloadDocument: JsonElementType, validationResult: ValidatorResult): void;
}
export declare type JsonSchemaDefinitionClass = typeof JsonSchemaDefinition;
