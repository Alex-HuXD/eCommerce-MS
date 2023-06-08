import express, { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { RequestValidationError } from '../errors/request-validation-error'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'

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
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //check for validation
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new RequestValidationError(errors.array())
            }

            //check if user exsiting
            const { email, password } = req.body
            const exsitingUser = await User.findOne({ email })
            if (exsitingUser) {
                throw new BadRequestError('Email in use')
            }

            //Create user and save into db
            const user = User.createUser({ email, password })
            await user.save()

            // generate JWT
            const userJWT = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_KEY!
            )

            // store jwt on session object
            req.session = {
                jwt: userJWT,
            }
            res.status(201).send(`user created: ${JSON.stringify(user)}`)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
)

export { router as signupRouter }
