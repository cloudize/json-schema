import { Schema, ValidatorResult } from 'jsonschema';
export declare type setupSchemaDependenciesFunction = (schemaDefinition: IJsonSchemaDefinition) => void;
export interface IJsonSchemaDefinition {
    schemaName(): string;
    setupSchemaDependencies?(registerSchemaFunction: setupSchemaDependenciesFunction): void;
    schemaDefinition(): Schema;
    postSchemaValidation?(payloadDocument: any, validationResult: ValidatorResult): void;
}
