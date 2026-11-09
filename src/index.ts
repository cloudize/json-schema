export { type Schema as JsonSchema, ValidationError as JsonSchemaValidationError } from 'jsonschema';

export { type IJsonSchemaDefinition, JsonSchemaValidator, type SetupSchemaDependenciesFunction } from './validator';

// eslint-disable-next-line import/no-cycle
export {
  DatetimeSchemaDefinition,
  EmailAddressSchemaDefinition,
  GeolocationPointSchemaDefinition,
  IpAddressSchemaDefinition,
  MongoDBObjectIdSchemaDefinition,
  UrlSchemaDefinition,
  UuidSchemaDefinition,
} from './schema-definitions';
