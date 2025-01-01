import Flag from "../../database/schemas/flagSchema"
import IFlag from "../../interfaces/iFlag"

const addFlagQuery = async (data: IFlag) => {
    const flag = await Flag.create(data)
    return flag
}
export default addFlagQuery