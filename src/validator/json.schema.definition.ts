import { Schema, ValidatorResult } from 'jsonschema';

// eslint-disable-next-line no-use-before-define
export type SetupSchemaDependenciesFunction = (schemaDefinition: IJsonSchemaDefinition, context: any) => void;

export interface IJsonSchemaDefinition {
  SchemaName(context: any): string;
  SetupSchemaDependencies?(registerSchemaFunction: SetupSchemaDependenciesFunction, context: any): void;
  SchemaDefinition(context: any): Schema;
  PostSchemaValidation?(payloadDocument: any, validationResult: ValidatorResult, context: any): void;
}
