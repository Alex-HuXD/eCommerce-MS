import mongoose from 'mongoose'
import { Password } from '../utils/password'

// descripts the required properties for create new user
interface IUserAttrs {
    email: string
    password: string
}

// Describes the properties that a single User Document has
interface IUserDoc extends mongoose.Document {
    email: string
    password: string
}

// Describes the properties that the User model has
interface IUserModel extends mongoose.Model<IUserDoc> {
    createUser: (attrs: IUserAttrs) => IUserDoc
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

//automatically
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

// For effective type checking with TS,
userSchema.statics.createUser = (attrs: IUserAttrs) => new User(attrs)

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema)

export { User }
