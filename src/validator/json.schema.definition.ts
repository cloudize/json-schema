import { Schema, ValidatorResult } from 'jsonschema';

export type SetupSchemaDependenciesFunction = (schemaDefinition: IJsonSchemaDefinition) => void;

export interface IJsonSchemaDefinition {
  schemaName(): string;
  setupSchemaDependencies?(registerSchemaFunction: SetupSchemaDependenciesFunction): void;
  schemaDefinition(): Schema;
  postSchemaValidation?(payloadDocument: any, validationResult: ValidatorResult): void;
}
