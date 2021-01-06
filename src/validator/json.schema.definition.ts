import { Schema, ValidatorResult } from 'jsonschema';

export type SetupSchemaDependenciesFunction = (schemaDefinition: IJsonSchemaDefinition, context: any) => void;

export interface IJsonSchemaDefinition {
  schemaName(context: any): string;
  setupSchemaDependencies?(registerSchemaFunction: SetupSchemaDependenciesFunction, context: any): void;
  schemaDefinition(context: any): Schema;
  postSchemaValidation?(payloadDocument: any, validationResult: ValidatorResult, context: any): void;
}
