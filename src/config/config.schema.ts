import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_NAME: Joi.string().default('auth-api'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().default(3600).required(),
});
