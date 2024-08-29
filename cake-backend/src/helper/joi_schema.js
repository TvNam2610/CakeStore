import joi from 'joi'

export const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required();
export const name = joi.string().alphanum().required();
export const price = joi.number().required();
export const quantity = joi.number().required()
export const description = joi.string().required()
export const image = joi.string().required()
export const category_id =joi.string().required()
export const id =joi.string().required()