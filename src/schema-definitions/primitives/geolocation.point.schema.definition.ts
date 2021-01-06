import { Schema } from 'jsonschema';
import { IJsonSchemaDefinition } from '../../index';

const GeolocationPointSchemaDefinition: IJsonSchemaDefinition = class {
    static schemaName = (context: any): string => '/core.geolocation.point.schema'

    static schemaDefinition = (context: any): Schema => ({
      $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
      id: GeolocationPointSchemaDefinition.schemaName(context),
      title: 'System GeoLocation Point Schema',
      description: '',
      type: 'object',
      properties: {
        type: {
          description: 'This is the geolocation record type.',
          type: 'string',
          enum: ['Point'],
        },
        coordinates: {
          description: 'This is the geolocation record type.',
          type: 'array',
          items: [
            {
              type: 'number',
              minimum: -180,
              maximum: 180,
            },
            {
              type: 'number',
              minimum: -90,
              maximum: 90,
            },
          ],
          minItems: 2,
          maxItems: 2,
        },
      },
      additionalProperties: false,
      required: ['type', 'coordinates'],
    })
}

export default GeolocationPointSchemaDefinition;
