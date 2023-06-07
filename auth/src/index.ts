import express from 'express'
import mongoose from 'mongoose'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { bypassRouter } from './routes/bypass'
import { NotFoundError } from './errors/not-found-error'

import { errorHandler } from './middlewares/error-handler'

const app = express()
app.use(express.json())

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

const up = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    } catch (err) {
        console.log(err)
    }
    console.log('db connected')
    app.listen(3000, () => {
        console.log('listen on port 3000!!!!!')
    })
}

up()
