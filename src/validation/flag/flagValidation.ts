import { object, string } from 'yup'
import type IFlag from '../../interfaces/iFlag'

const validateNewFlag = async (data: IFlag) => {
    const schema = object().shape({
        ownerId: string().required('owner is required'),
        userId: string(),
        postId: string(),
        commentId: string(),
        productId: string()
    })
    const result = await schema.validate(data, { abortEarly: false })
    return result
}

export default validateNewFlag 