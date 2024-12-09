import { object, string } from 'yup'
import type IPetType from '../../interfaces/iPetType'

const validateNewPetType = async (data: IPetType) => {
    const schema = object().shape({
        title: string().required('Pet type is required.'),
    })
    const result = await schema.validate(data, { abortEarly: false })
    return result
}

export default validateNewPetType 