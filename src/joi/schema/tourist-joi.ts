import Joi from "joi";

export const upsertTouristSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required()
}).meta({ className: 'UpsertTouristRequest' })

export const listTouristSchema = Joi.object({
    limit: Joi.number().default(10).optional(),
    offset: Joi.number().default(0).optional()
}).meta({ className: 'ListTouristRequest' })