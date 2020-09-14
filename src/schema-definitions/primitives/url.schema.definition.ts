import { Schema } from 'jsonschema';
import { JsonSchemaDefinition } from '../../index';

// eslint-disable-next-line max-len
const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9_]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/ig;

export default class UrlSchemaDefinition extends JsonSchemaDefinition {
    static schemaName = (): string => '/core.url.schema';

    static schemaDefinition = (): Schema => ({
      $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
      id: UrlSchemaDefinition.schemaName(),
      title: 'Schema for a URL',
      description: 'Schema for use in the validation of a URL',
      type: 'string',
      pattern: regex,
    })
}
