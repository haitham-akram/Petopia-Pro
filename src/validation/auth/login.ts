import { object, string } from 'yup'

type LoginData = {
  email: string,
  password: string
}

const validateLogin = async (data: LoginData) => {
  const schema = object().shape({
    email: string().email('Email is invalid').required('Email is required'),
    password: string().min(8, 'Password must be at least 8 characters').required('Password is required')
  })
  const result = await schema.validate(data, { abortEarly: false })
  return result
}



export default validateLogin 