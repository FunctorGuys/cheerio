import Joi from '@hapi/joi';

export const process = Joi.object().keys({
  headContent: Joi.string().required(),
});
