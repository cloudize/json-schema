"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const GeolocationPointSchemaDefinition = (_a = class {
    },
    _a.schemaName = () => '/core.geolocation.point.schema',
    _a.schemaDefinition = () => ({
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
    }),
    _a);
exports.default = GeolocationPointSchemaDefinition;
