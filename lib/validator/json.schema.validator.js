"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonschema_1 = require("jsonschema");
class JsonSchemaValidator {
    constructor() {
        this._validator = undefined;
        this._validationErrors = undefined;
        this.setupSchemaDependencies = (schemaDefinition) => {
            if (schemaDefinition.setupSchemaDependencies) {
                const setupSchemaDependencyFunction = this.setupSchemaDependencies.bind(this);
                schemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
            }
            const _schemaDefinition = schemaDefinition.schemaDefinition();
            this.validator.addSchema(_schemaDefinition, schemaDefinition.schemaName());
        };
        this.setupSchema = (schemaDefinition) => {
            if (schemaDefinition.setupSchemaDependencies) {
                const setupSchemaDependencyFunction = this.setupSchemaDependencies.bind(this);
                schemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
            }
        };
        this.setupValidator = () => {
            this.teardownValidator();
            this._validator = new jsonschema_1.Validator();
        };
        this.teardownValidator = () => {
            this._validator = undefined;
        };
        this.validate = (payloadDocument, schemaDefinition) => {
            this._validationErrors = undefined;
            if (!payloadDocument) {
                this._validationErrors = [new jsonschema_1.ValidationError('The payload was empty.')];
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
        };
    }
    get validationErrors() {
        return this._validationErrors;
    }
    get validator() {
        return this._validator;
    }
}
exports.default = JsonSchemaValidator;
