import { ValidationError, Validator } from 'jsonschema';
import { isDefined, isUndefined } from '@cloudize/json';
import type { IJsonSchemaDefinition, SetupSchemaDependenciesFunction } from './json.schema.definition';

export default class JsonSchemaValidator {
  private _validator: Validator = undefined;

  private _validationErrors: ValidationError[] = undefined;

  private CallSchemaDefinitionsSetupSchemaDependencies(schemaDefinition: IJsonSchemaDefinition, context?: any) {
    if (isDefined(schemaDefinition.SetupSchemaDependencies)) {
      const setupSchemaDependencyFunction: SetupSchemaDependenciesFunction = this.SetupSchemaDependencies.bind(this);
      schemaDefinition.SetupSchemaDependencies(setupSchemaDependencyFunction, context);
    }
  }

  private SetupSchemaDependencies = (schemaDefinition: IJsonSchemaDefinition, context?: any) => {
    this.CallSchemaDefinitionsSetupSchemaDependencies(schemaDefinition, context);

    // eslint-disable-next-line no-underscore-dangle
    const _schemaDefinition = schemaDefinition.SchemaDefinition(context);

    this.validator.addSchema(_schemaDefinition, schemaDefinition.SchemaName(context));
  };

  private SetupSchema = (schemaDefinition: IJsonSchemaDefinition, context?: any) => {
    this.CallSchemaDefinitionsSetupSchemaDependencies(schemaDefinition, context);
  };

  private SetupValidator = () => {
    this.TeardownValidator();
    this._validator = new Validator();
  };

  private TeardownValidator = () => {
    this._validator = undefined;
  };

  get validationErrors() {
    return this._validationErrors;
  }

  get validator() {
    return this._validator;
  }

  Validate = (payloadDocument: any, schemaDefinition: IJsonSchemaDefinition, context?: any): boolean => {
    this._validationErrors = undefined;
    if (isUndefined(payloadDocument)) {
      this._validationErrors = [new ValidationError('The payload was empty.')];
      return false;
    }

    this.SetupValidator();
    this.SetupSchema(schemaDefinition, context);

    // eslint-disable-next-line no-underscore-dangle
    const _schemaDefinition = schemaDefinition.SchemaDefinition(context);

    const validationResult = this.validator.validate(payloadDocument, _schemaDefinition);

    if ((validationResult.valid) && (schemaDefinition.PostSchemaValidation)) {
      schemaDefinition.PostSchemaValidation(payloadDocument, validationResult, context);
    }

    if (!validationResult.valid) {
      this._validationErrors = validationResult.errors;
    }

    return validationResult.valid;
  };
}
