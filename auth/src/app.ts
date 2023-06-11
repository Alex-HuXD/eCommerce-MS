import express from 'express'

import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { bypassRouter } from './routes/bypass'
import { NotFoundError } from './errors/not-found-error'

import { errorHandler } from './middlewares/error-handler'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
)

// routes
app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(bypassRouter)

//empty route
app.all('*', () => {
    throw new NotFoundError()
})

//middlewares
app.use(errorHandler)

export { app }
