import { ValidationError, Validator } from 'jsonschema';
import type { IJsonSchemaDefinition, SetupSchemaDependenciesFunction } from './json.schema.definition';

export default class JsonSchemaValidator {
    private _validator: Validator = undefined;

    private _validationErrors: ValidationError[] = undefined;

    setupSchemaDependencies = (schemaDefinition: IJsonSchemaDefinition) => {
      if (schemaDefinition.setupSchemaDependencies) {
        const setupSchemaDependencyFunction: SetupSchemaDependenciesFunction = this.setupSchemaDependencies.bind(this);
        schemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
      }

      const _schemaDefinition = schemaDefinition.schemaDefinition();

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

    validate = (payloadDocument: any, schemaDefinition: IJsonSchemaDefinition) => {
      this._validationErrors = undefined;
      if (!payloadDocument) {
        this._validationErrors = [new ValidationError('The payload was empty.')];
        return false;
      }

      this.setupValidator();
      this.setupSchema(schemaDefinition);

      const _schemaDefinition = schemaDefinition.schemaDefinition();

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
