// Core
import * as Joi from 'joi';

/**
 * Validation options for environment variables
 */
export const ConfigOptions = {
  allowUnknown: true,
  abortEarly: true,
};

/**
 * Validation schema for environment variables
 */
export const EnvironmentValidation = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  NAME: Joi.string().default('Backend API'),
  PORT: Joi.number().default(3000),
  HOST: Joi.string().default('localhost'),
  PREFIX: Joi.string().default('/api'),
  DATABASE_URL: Joi.string(),
});
