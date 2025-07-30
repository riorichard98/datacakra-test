import _ from 'lodash';
import Joi from 'joi';
import { throwRequestError } from '../middleware/error-handler';

export const cleanObject = (data: Record<string, any>): Record<string, any> => {
    return _.omitBy(data, value =>
        (!value && value !== 0) && typeof value !== 'boolean'
    );
}

export const validateRequest = (schema: Joi.ObjectSchema<any>, request: Record<string,any>) => {
    const validation = schema.validate(request);
    if (validation.error) throwRequestError(validation.error.details[0].message)
    return validation.value;
}