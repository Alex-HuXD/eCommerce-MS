import express from 'express'

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
app.get('*', async () => {
    throw new NotFoundError()
})

//middlewares
app.use(errorHandler)

app.listen(3000, () => {
    console.log('listen on port 3000!!!!!')
})
