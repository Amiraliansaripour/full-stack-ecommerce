import { check, validationResult } from 'express-validator';
export const brandValidate = () => {
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