import { object, string } from 'yup'
type follow = {
    userId: string,
    wantedUserId: string
}
const validateFollow = async (follow: follow) => {
    const schema = object().shape({
        userId: string().required('userId is required'),
        wantedUserId: string().required('wantedUserId is required')
    })
    return await schema.validate(follow, { abortEarly: false })

}
export default validateFollow