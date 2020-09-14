"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonschema_1 = require("jsonschema");
class JsonSchemaValidator {
    constructor() {
        this._validator = undefined;
        this._validationErrors = undefined;
        this.setupSchemaDependencies = (jsonSchemaDefinition) => {
            if (jsonSchemaDefinition.setupSchemaDependencies) {
                const setupSchemaDependencyFunction = this.setupSchemaDependencies.bind(this);
                jsonSchemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
            }
            const schemaDefinition = jsonSchemaDefinition.schemaDefinition();
            this.validator.addSchema(schemaDefinition, jsonSchemaDefinition.schemaName());
        };
        this.setupSchema = (jsonSchemaDefinition) => {
            if (jsonSchemaDefinition.setupSchemaDependencies) {
                const setupSchemaDependencyFunction = this.setupSchemaDependencies.bind(this);
                jsonSchemaDefinition.setupSchemaDependencies(setupSchemaDependencyFunction);
            }
        };
        this.setupValidator = () => {
            this.teardownValidator();
            this._validator = new jsonschema_1.Validator();
        };
        this.teardownValidator = () => {
            this._validator = undefined;
        };
        this.validate = (payloadDocument, jsonSchemaDefinition) => {
            this._validationErrors = undefined;
            if (!payloadDocument) {
                this._validationErrors = [new jsonschema_1.ValidationError('The payload was empty.')];
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
