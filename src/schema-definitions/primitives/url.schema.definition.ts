import { Schema } from 'jsonschema';
import { IJsonSchemaDefinition } from '../../index';

// eslint-disable-next-line max-len
const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!224(?:\.\d{1,3}){3})(((25[0-5]|2[0-4][0-9]|1[0-9]{2,2}|[1-9]{0,1}[0-9])\.){3,3}(25[0-5]|2[0-4][0-9]|1[0-9]{2,2}|[1-9]{0,1}[0-9]))|(?:(?:[a-z\u00a1-\uffff0-9_]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/ig;

const UrlSchemaDefinition: IJsonSchemaDefinition = class {
    static SchemaName = (context: any): string => '/core.url.schema';

    static SchemaDefinition = (context: any): Schema => ({
      $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
      id: UrlSchemaDefinition.SchemaName(context),
      title: 'Schema for a URL',
      description: 'Schema for use in the validation of a URL',
      type: 'string',
      pattern: regex,
    })
};

export default UrlSchemaDefinition;
