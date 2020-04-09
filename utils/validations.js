import Joi from '@hapi/joi';

export const usersValidation = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required()
});


export const productValidation = Joi.object({
    sku: Joi.string().required(),
    name: Joi.string().required(),
    unit_price: Joi.number().required(),
    description: Joi.string().required()
})

export const transValidation = Joi.object({
    product_id: Joi.string().required(),
    user_id: Joi.string().required(),
    quantity: Joi.number().required(),
    total_price: Joi.number().required()
})