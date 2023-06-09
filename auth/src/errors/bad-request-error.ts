import { CustomError } from './custom-error'

export class BadRequestError extends CustomError {
    statusCode = 400

    constructor(public message: string) {
        super(message)
        this.message = message
    }

    serializeErrors = () => {
        return [{ message: this.message }]
    }
}
