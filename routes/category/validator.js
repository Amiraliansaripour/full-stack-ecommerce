import { check, validationResult } from 'express-validator';

export const categoryValidate = () => {
    return [
        check('name')
            .notEmpty()
            .withMessage('name is required'),
        // id
        check('id')
            .notEmpty()
            .withMessage('id is required'),

    ]
} 