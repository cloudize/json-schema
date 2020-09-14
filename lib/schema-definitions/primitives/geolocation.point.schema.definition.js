"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
class GeolocationPointSchemaDefinition extends index_1.JsonSchemaDefinition {
}
exports.default = GeolocationPointSchemaDefinition;
GeolocationPointSchemaDefinition.schemaName = () => '/core.geolocation.point.schema';
GeolocationPointSchemaDefinition.schemaDefinition = () => ({
    $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
    id: GeolocationPointSchemaDefinition.schemaName(),
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
});
