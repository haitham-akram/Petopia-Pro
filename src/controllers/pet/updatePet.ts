import { type Response, type NextFunction } from "express"
import { type CustomRequest } from "../../interfaces/iUser"
import { IPet } from "../../interfaces/iPet";
import { validateNewPet } from "../../validation/pet";
import { updatePetQuery } from "../../queries/pet";

const updatePet = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const ownerId = req.userInfo?.id as string;
    const petData = { ...req.body, ownerId: req.userInfo?.id } as IPet;
    const id = req.params.id
    try {
        const validatedPetData = await validateNewPet(petData as IPet)
        const updatedPet = await updatePetQuery(id, ownerId, validatedPetData)
        res.status(200).json({
            message: "Pet updated successfully.",
            data: updatedPet
        })
    } catch (error) {
        next(error)
    }
}
export default updatePet