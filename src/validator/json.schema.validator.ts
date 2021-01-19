import { ValidationError, Validator } from 'jsonschema';
import type { IJsonSchemaDefinition, SetupSchemaDependenciesFunction } from './json.schema.definition';
import {isUndefined} from "@apigames/json";

export default class JsonSchemaValidator {
    private _validator: Validator = undefined;

    private _validationErrors: ValidationError[] = undefined;

    private SetupSchemaDependencies = (schemaDefinition: IJsonSchemaDefinition, context?: any) => {
      if (schemaDefinition.SetupSchemaDependencies) {
        const setupSchemaDependencyFunction: SetupSchemaDependenciesFunction = this.SetupSchemaDependencies.bind(this);
        schemaDefinition.SetupSchemaDependencies(setupSchemaDependencyFunction, context);
      }

      const _schemaDefinition = schemaDefinition.SchemaDefinition(context);

      this.validator.addSchema(_schemaDefinition, schemaDefinition.SchemaName(context));
    }

    private SetupSchema = (schemaDefinition: IJsonSchemaDefinition, context?: any) => {
      if (schemaDefinition.SetupSchemaDependencies) {
        const setupSchemaDependencyFunction: SetupSchemaDependenciesFunction = this.SetupSchemaDependencies.bind(this);
        schemaDefinition.SetupSchemaDependencies(setupSchemaDependencyFunction, context);
      }
    }

    private SetupValidator = () => {
      this.TeardownValidator();
      this._validator = new Validator();
    }

    private TeardownValidator = () => {
      this._validator = undefined;
    }

    get validationErrors() {
      return this._validationErrors;
    }

    get validator() {
      return this._validator;
    }

    Validate = (payloadDocument: any, schemaDefinition: IJsonSchemaDefinition, context?: any) => {
      this._validationErrors = undefined;
      if (isUndefined(payloadDocument)) {
        this._validationErrors = [new ValidationError('The payload was empty.')];
        return false;
      }

      this.SetupValidator();
      this.SetupSchema(schemaDefinition, context);

      const _schemaDefinition = schemaDefinition.SchemaDefinition(context);

      const validationResult = this.validator.validate(payloadDocument, _schemaDefinition);

      if ((validationResult.valid) && (schemaDefinition.PostSchemaValidation)) {
        schemaDefinition.PostSchemaValidation(payloadDocument, validationResult, context);
      }

      if (!validationResult.valid) {
        this._validationErrors = validationResult.errors;
      }

      return validationResult.valid;
    }
}
