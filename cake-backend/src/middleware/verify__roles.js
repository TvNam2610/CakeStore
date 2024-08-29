import { notAuth } from "./handle_error";

export const isAdmin= (req, res, next) => {
    const {role_code} = req.user
    if(role_code !== 'R1') {
        return notAuth('Require role admin', res)
    }
    next()
} 