"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const validatorTranslation_1 = require("../../helpers/validatorTranslation");
const bodyValidation = () => {
    return [
        (0, express_validator_1.body)('name', () => (0, validatorTranslation_1.translate)("vehicle__type__name__required")).notEmpty(),
    ];
};
exports.bodyValidation = bodyValidation;
