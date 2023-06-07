import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'

const router = express.Router()

router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 6, max: 20 })
            .withMessage('Password must be tween 6 and 20 characters'),
    ],
    async (req: Request, res: Response) => {
        try {
            //check for validation
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new RequestValidationError(errors.array())
            }

            //check if exsiting
            const { email, password } = req.body
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
)

export { router as signupRouter }
