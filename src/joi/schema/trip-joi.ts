import Joi from "joi";
import dayjs from 'dayjs'

// validate only timezone utc ends with z only is valid
const utcDate = Joi.string().custom((value, helpers) => {
    // regex for format iso 8601 validation ends with z
    const utcIsoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
    if (!utcIsoRegex.test(value)) {
        return helpers.error('date.invalidUtc');
    }
    return value;
}, 'UTC strict UTC-Z check').messages({
    'date.invalidUtc': 'invalid UTC format'
});;

const tripBaseSchema = Joi.object({
    destination: Joi.string().required(),
    startDate: utcDate.required(),
    endDate: utcDate.required()
}).custom((value, helpers) => {
    const start = dayjs(value.startDate)
    const end = dayjs(value.endDate)

    if (!start.isBefore(end)) {
        return helpers.error('any.invalid', { message: 'endDate harus setelah startDate' })
    }

    return value
}).messages({
    'any.invalid': '{{#message}}'
})

export const insertTripSchema = Joi.object({
    userId: Joi.string().uuid().required()
}).concat(tripBaseSchema).meta({ className: 'InsertTripRequest' })

export const updateTripSchema = Joi.object({
    tripId: Joi.string().uuid().required()
}).concat(tripBaseSchema).meta({ className: 'UpdateTripRequest' })

export const listTripSchema = Joi.object({
    limit: Joi.number().default(10).optional(),
    offset: Joi.number().default(0).optional()
}).meta({ className: 'ListTripRequest' })