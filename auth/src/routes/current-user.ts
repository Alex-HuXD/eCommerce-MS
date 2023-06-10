import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.session?.jwt) {
            return res.send({ currentUser: null })
        }
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
        res.send({ currentUser: payload })
    } catch (err) {
        res.send({ currentUser: null })
        next(err)
    }
})

export { router as currentUserRouter }
