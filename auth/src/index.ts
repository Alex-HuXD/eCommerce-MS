import mongoose from 'mongoose'
import { app } from './app'

const up = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not defined')
    }
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
