import express, { Request, Response, NextFunction } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { validateRequest } from '../middlewares/validate-request'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../utils/password'

const router = express.Router()

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('password needed '),
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body
            // check if user existed
            const existingUser = await User.findOne({ email })
            if (!existingUser) {
                //for security, the less info the better
                throw new BadRequestError('Invalid credentials')
            }

            //auth the user
            const passwordsMatch = await Password.compare(existingUser.password, password)
            if (!passwordsMatch) {
                throw new BadRequestError('Invalid credentials')
            }
            // generate JWT
            const userJWT = jwt.sign(
                {
                    id: existingUser.id,
                    email: existingUser.email,
                },
                process.env.JWT_KEY!
            )

            // store jwt on session object
            req.session = {
                jwt: userJWT,
            }
            res.status(200).send(existingUser)
        } catch (error) {
            next(error)
        }
    }
)

export { router as signinRouter }
