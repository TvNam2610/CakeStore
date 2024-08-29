import * as services from '../services'
import { internalServerError,badRequest } from '../middleware/handle_error'
import {name,email, password} from '../helper/joi_schema'
import joi from 'joi'

export const register = async (req, res) => {
    try {
        const {error} = joi.object({name,email,password}).validate(req.body)
        if(error) return badRequest(error.details[0]?.message,res)
        const response = await services.register(req.body)
        console.log(response);
        return res.status(200).json(response)   
        
    } catch (error) {
        console.log(error)
        return internalServerError(res);
    }
}
export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) return res.status(400).json({
            err: 1 ,
            mes:'missing payloads'
        })

        const response = await services.login(req.body)
        return res.status(200).json(response)   
    } catch (error) {
        console.log(error)
        return internalServerError(res);
    }
}