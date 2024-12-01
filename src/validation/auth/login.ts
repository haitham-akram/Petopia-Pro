import { object, string } from 'yup'

const loginSchema = object({
  email: string().email().required(),
  password: string().min(8).required()
})

export default loginSchema 