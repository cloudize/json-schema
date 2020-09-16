"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const DatetimeSchemaDefinition = (_a = class {
    },
    _a.schemaName = () => '/core.datetime.schema',
    _a.schemaDefinition = () => ({
        $schema: 'http://json-document-schemas.org/draft-06/document-schemas#',
        id: DatetimeSchemaDefinition.schemaName(),
        title: 'Schema for a date and time',
        description: 'Schema for use in the validation of an ISO8601 date and time',
        type: 'string',
        minLength: 22,
        maxLength: 29,
        pattern: '^([1-2][0-9]{3})'
            + '(-((0[1-9])|(1[0-2])))'
            + '(-((0[1-9])|([1-2][0-9])|(3[0-1])))'
            + '(T)'
            + '((([0-1][0-9])|(2[0-3])):)'
            + '([0-5][0-9]:)'
            + '([0-5][0-9])'
            + '(\\.[0-9]{1,3})'
            + '(Z|(-(((0[0-9]|1[0-1])[:]?[0-5][0-9])|(12[:]?00)))|(\\+(((0[0-9]|1[0-3])[:]?[0-5][0-9])|(14[:]?00))))$',
    }),
    _a);
exports.default = DatetimeSchemaDefinition;
