import Joi from "joi";

export const upsertTripSchema = Joi.object({
    tripId: Joi.string().uuid().optional(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    destination: Joi.string().required()
}).meta({ className: 'UpsertTripRequest' })