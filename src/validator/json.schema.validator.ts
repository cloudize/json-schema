import {
  ValidationError,
  Validator,
} from 'jsonschema';
import { JsonElementType } from '@apigames/json';
import type { JsonSchemaDefinitionClass, setupSchemaDependenciesFunction } from './json.schema.definition';

export default class JsonSchemaValidator {
    private _validator: Validator = undefined;

    private _validationErrors: ValidationError[] = undefined;

    setupSchemaDependencies = (jsonSchemaDefinition: JsonSchemaDefinitionClass) => {
      if (jsonSchemaDefinition.setupSchemaDependencies) {
        const setupSchemaDependencyFunction: setupSchemaDependenciesFunction = this.setupSchemaDependencies.bind(this);
        jsonSchemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
      }

      const schemaDefinition = jsonSchemaDefinition.schemaDefinition();

      this.validator.addSchema(schemaDefinition, jsonSchemaDefinition.schemaName());
    }

    setupSchema = (jsonSchemaDefinition: JsonSchemaDefinitionClass) => {
      if (jsonSchemaDefinition.setupSchemaDependencies) {
        const setupSchemaDependencyFunction: setupSchemaDependenciesFunction = this.setupSchemaDependencies.bind(this);
        jsonSchemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
      }
    }

    setupValidator = () => {
      this.teardownValidator();
      this._validator = new Validator();
    }

    teardownValidator = () => {
      this._validator = undefined;
    }

    get validationErrors() {
      return this._validationErrors;
    }

    get validator() {
      return this._validator;
    }

    validate = (payloadDocument: JsonElementType, jsonSchemaDefinition: JsonSchemaDefinitionClass) => {
      this._validationErrors = undefined;
      if (!payloadDocument) {
        this._validationErrors = [new ValidationError('The payload was empty.')];
        return false;
      }

      this.setupValidator();
      this.setupSchema(jsonSchemaDefinition);

      const schemaDefinition = jsonSchemaDefinition.schemaDefinition();

      const validationResult = this.validator.validate(payloadDocument, schemaDefinition);

      if ((validationResult.valid) && (jsonSchemaDefinition.postSchemaValidation)) {
        jsonSchemaDefinition.postSchemaValidation(payloadDocument, validationResult);
      }

      if (!validationResult.valid) {
        this._validationErrors = validationResult.errors;
      }

      return validationResult.valid;
    }
}
