import { Schema, ValidatorResult } from 'jsonschema';
import { JsonElementType } from '@apigames/json';

export type setupSchemaDependenciesFunction = (schemaDefinition: JsonSchemaDefinitionClass) => void;

export default class JsonSchemaDefinition {
  static schemaName(): string {
    throw new Error('Not implemented.');
  }

  // eslint-disable-next-line no-unused-vars
  static setupSchemaDependencies?(registerSchemaFunction: setupSchemaDependenciesFunction): void {
  }

  static schemaDefinition(): Schema {
    throw new Error('Not implemented.');
  }

  // eslint-disable-next-line no-unused-vars
  static postSchemaValidation?(payloadDocument: JsonElementType, validationResult: ValidatorResult): void {
  }
}

export type JsonSchemaDefinitionClass = typeof JsonSchemaDefinition;
