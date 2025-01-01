import { object, string, boolean, number } from 'yup'
import { type UserType } from '../../interfaces/iUser'

const validateSignup = async (data: UserType) => {
    const schema = object().shape({
        fullName: string().required('Full Name is required'),
        email: string().email('email is invalid').required('Email is required'),
        password: string().when('googleId', (googleId, schema) => {
            return googleId ? schema.notRequired() : schema.min(8, 'Password must be at least 8 characters').required('Password is required');
        }),
        userImage: string(),
        profileImage: string(),
        phone: string().min(10, 'Phone number must be at least 10').max(14, 'Phone number must be at least 14'),
        address: string(),
        isAdmin: boolean().default(false),
        status: string().oneOf(['active', 'inactive']).required().default('active'),
        verified: boolean().default(false),
        followerCount: number().default(0),
        followingCount: number().default(0),
        googleId: string()
    })
    const result = await schema.validate(data, { abortEarly: false })
    return result
}

export default validateSignup 