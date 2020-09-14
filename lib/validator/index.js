"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSchemaValidator = exports.JsonSchemaDefinition = void 0;
var json_schema_definition_1 = require("./json.schema.definition");
Object.defineProperty(exports, "JsonSchemaDefinition", { enumerable: true, get: function () { return __importDefault(json_schema_definition_1).default; } });
var json_schema_validator_1 = require("./json.schema.validator");
Object.defineProperty(exports, "JsonSchemaValidator", { enumerable: true, get: function () { return __importDefault(json_schema_validator_1).default; } });
