import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export class Password {
    static toHash = async (password: string) => {
        const salt = randomBytes(8).toString('hex')
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer

        return `${buffer.toString('hex')}.${salt}`
    }
    static compare = async (savedPassword: string, suppliedPassword: string) => {
        const [hashedPassword, salt] = savedPassword.split('.')
        const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer

        return buffer.toString('hex') === hashedPassword
    }
}
