import { check, validationResult } from 'express-validator';

export const productValidate = () => {
    return [
        check('name')
            .notEmpty()
            .withMessage('name is required'),
        // price
        check('price')
            .notEmpty()
            .withMessage('price is required'),
        // category
        check('category')
            .notEmpty()
            .withMessage('category is required'),
        // smell
        check('smell')
            .notEmpty()
            .withMessage('smell is required'),
        // mil
        check('mil')
            .notEmpty()
            .withMessage('mil is required'),
        // description
        check('description')
            .notEmpty()
            .withMessage('description is required'),
        // mil
        check('photo')
            .notEmpty()
            .withMessage('photo is required')
    ]
} 

