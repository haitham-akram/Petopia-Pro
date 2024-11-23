class CustomError extends Error {
    status: number
    constructor(status: number, msg: string) {
        super(msg)
        this.status = status
    }
}

export default CustomError
