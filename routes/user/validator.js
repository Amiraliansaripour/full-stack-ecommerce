import { check, validationResult } from 'express-validator';

export const registerValidate = () => {
    return [
        check('name')
            .notEmpty()
            .withMessage('name is required'),
        // Email
        check('email')
            .isEmail()
            .withMessage('email is required'),
        // Phone
        check('phone')
            .notEmpty()
            .withMessage('phone is required'),
        // Address
        check('address')
        .notEmpty()
        .withMessage('address is required'),
        // Password
        check('password')
        .notEmpty()
        .withMessage('password is required'),

    ]
} 


export const loginValidate = () =>{
    return [
        // Email
        check('email')
            .isEmail()
            .withMessage('email is required'),
        // Password
        check('password')
        .notEmpty()
        .withMessage('password is required'),
    ]
}

export const ForgetPasswordValidate = () =>{
    return [
        // Email
        check('email')
            .isEmail()
            .withMessage('email is required'),
        // Password
        check('password')
        .notEmpty()
        .withMessage('password is required'),
        // querstion
        check('querstion')
        .notEmpty()
        .withMessage('querstion is required'),
    ]
}
