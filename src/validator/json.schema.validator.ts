import { ValidationError, Validator } from 'jsonschema';
import type { IJsonSchemaDefinition, SetupSchemaDependenciesFunction } from './json.schema.definition';
import {isUndefined} from "@apigames/json";

export default class JsonSchemaValidator {
    private _validator: Validator = undefined;

    private _validationErrors: ValidationError[] = undefined;

    setupSchemaDependencies = (schemaDefinition: IJsonSchemaDefinition, context: any = undefined) => {
      if (schemaDefinition.setupSchemaDependencies) {
        const setupSchemaDependencyFunction: SetupSchemaDependenciesFunction = this.setupSchemaDependencies.bind(this);
        schemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction, context);
      }

      const _schemaDefinition = schemaDefinition.schemaDefinition(context);

      this.validator.addSchema(_schemaDefinition, schemaDefinition.schemaName(context));
    }

    setupSchema = (schemaDefinition: IJsonSchemaDefinition, context: any = undefined) => {
      if (schemaDefinition.setupSchemaDependencies) {
        const setupSchemaDependencyFunction: SetupSchemaDependenciesFunction = this.setupSchemaDependencies.bind(this);
        schemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction, context);
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

    validate = (payloadDocument: any, schemaDefinition: IJsonSchemaDefinition, context: any = undefined) => {
      this._validationErrors = undefined;
      if (isUndefined(payloadDocument)) {
        this._validationErrors = [new ValidationError('The payload was empty.')];
        return false;
      }

      this.setupValidator();
      this.setupSchema(schemaDefinition, context);

      const _schemaDefinition = schemaDefinition.schemaDefinition(context);

      const validationResult = this.validator.validate(payloadDocument, _schemaDefinition);

      if ((validationResult.valid) && (schemaDefinition.postSchemaValidation)) {
        schemaDefinition.postSchemaValidation(payloadDocument, validationResult, context);
      }

      if (!validationResult.valid) {
        this._validationErrors = validationResult.errors;
      }

      return validationResult.valid;
    }
}
