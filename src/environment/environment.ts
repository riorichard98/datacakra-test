import Joi from 'joi';

import { Environment } from './interface';

const envSchema = Joi.object({
    PORT: Joi.number().port().required(),
    JWT_SECRET: Joi.string().required()
}).unknown(true)

const { error, value: validatedEnv } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
    console.error('Environment variable validation error:', error.details);
    process.exit(1); // Exit the process with failure status

}

export const env = validatedEnv as Environment;