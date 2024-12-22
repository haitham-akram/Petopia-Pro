import Flag from "../../database/schemas/flagSchema"

const deleteFlagQuery = async (id: string) => {
    const deletedFlag = await Flag.deleteOne({ _id: id })
    return deletedFlag
}
export default deleteFlagQuery