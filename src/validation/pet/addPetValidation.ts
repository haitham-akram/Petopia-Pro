import { object, string, number } from 'yup'
import { type IPet } from '../../interfaces/iPet'

const validateNewPet = async (data: IPet) => {
    const schema = object().shape({
        ownerId: string().required('owner is required'),
        petName: string().required('pet name is required'),
        type: number().required('pet type is required'),
        dob: string().required('date of birth is required'),
        petImage: string(),
        gender: number().required('gender is required'),
        healthStatus: string().default('healthy'),
        adoptionStatus: string().oneOf(['available', 'adopted']).required('adoption status is required')
    })
    const result = await schema.validate(data, { abortEarly: false })
    return result
}

export default validateNewPet 