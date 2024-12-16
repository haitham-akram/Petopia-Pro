import { object, string } from 'yup'
type follow = {
    followerId: string,
    followingId: string
}
const validateFollow = async (follow: follow) => {
    const schema = object().shape({
        followerId: string().required('FollowerId is required'),
        followingId: string().required('FollowingId is required')
    })
    return await schema.validate(follow, { abortEarly: false })

}
export default validateFollow