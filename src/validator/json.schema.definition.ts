import { Schema, ValidatorResult } from 'jsonschema';

export type setupSchemaDependenciesFunction = (schemaDefinition: IJsonSchemaDefinition) => void;

export interface IJsonSchemaDefinition {
  schemaName(): string;
  setupSchemaDependencies?(registerSchemaFunction: setupSchemaDependenciesFunction): void;
  schemaDefinition(): Schema;
  postSchemaValidation?(payloadDocument: any, validationResult: ValidatorResult): void;
}
