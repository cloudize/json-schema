import { Schema, ValidatorResult } from 'jsonschema';
import { JsonElementType } from '@apigames/json';

export type setupSchemaDependenciesFunction = (schemaDefinition: IJsonSchemaDefinition) => void;

export interface IJsonSchemaDefinition {
  schemaName(): string;
  setupSchemaDependencies?(registerSchemaFunction: setupSchemaDependenciesFunction): void;
  schemaDefinition(): Schema;
  postSchemaValidation?(payloadDocument: JsonElementType, validationResult: ValidatorResult): void;
}
