import { ValidationError, Validator } from 'jsonschema';
import type { IJsonSchemaDefinition, SetupSchemaDependenciesFunction } from './json.schema.definition';
import {isUndefined} from "@apigames/json";

export default class JsonSchemaValidator {
    private _context: any = undefined;

    private _validator: Validator = undefined;

    private _validationErrors: ValidationError[] = undefined;

    setupSchemaDependencies = (schemaDefinition: IJsonSchemaDefinition) => {
      if (schemaDefinition.setupSchemaDependencies) {
        const setupSchemaDependencyFunction: SetupSchemaDependenciesFunction = this.setupSchemaDependencies.bind(this);
        schemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
      }

      const _schemaDefinition = schemaDefinition.schemaDefinition(this._context);

      this.validator.addSchema(_schemaDefinition, schemaDefinition.schemaName());
    }

    setupSchema = (schemaDefinition: IJsonSchemaDefinition) => {
      if (schemaDefinition.setupSchemaDependencies) {
        const setupSchemaDependencyFunction: SetupSchemaDependenciesFunction = this.setupSchemaDependencies.bind(this);
        schemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
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
      this._context = context;
      if (isUndefined(payloadDocument)) {
        this._validationErrors = [new ValidationError('The payload was empty.')];
        return false;
      }

      this.setupValidator();
      this.setupSchema(schemaDefinition);

      const _schemaDefinition = schemaDefinition.schemaDefinition(context);

      const validationResult = this.validator.validate(payloadDocument, _schemaDefinition);

      if ((validationResult.valid) && (schemaDefinition.postSchemaValidation)) {
        schemaDefinition.postSchemaValidation(payloadDocument, validationResult);
      }

      if (!validationResult.valid) {
        this._validationErrors = validationResult.errors;
      }

      return validationResult.valid;
    }
}
