import { check, validationResult } from 'express-validator';


export const validate = (req, res, next) => {


    let result = validationResult(req)
    let valid;
    if (!result.isEmpty()) {
        const errors = result;
        const message = []
        message.push(errors)
        // errors.forEach((err) => message.push(err.msg));
        res.status(400).json({
            message: "validate error",
            data: message,
        })

        return valid = false
    } else {
         valid = true
    }


    if (valid != true) {
        return;
    }
    next()
}