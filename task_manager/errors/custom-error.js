class CustomAPIError extends Error {
    constructor(msg, statusCode) {
        super(msg)
        this.status = statusCode
    }

    static create = (msg, statusCode) => new this(msg, statusCode)
}

module.exports = { CustomAPIError, createCustomError: CustomAPIError.create }