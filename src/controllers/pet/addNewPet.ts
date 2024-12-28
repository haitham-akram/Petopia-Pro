import { type Response, type NextFunction } from "express"
import { type IPet } from "../../interfaces/iPet";
import { validateNewPet } from "../../validation/pet";
import addNewPetQuery from "../../queries/pet/addNewPetQuery";
import { type CustomRequest } from "../../interfaces/iUser";

const addNewPet = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const petData = { ...req.body, ownerId: req.userInfo?.id };
    try {
        const {
            ownerId,
            petName,
            type,
            petImage,
            dob,
            gender,
            healthStatus,
            adoptionStatus } = await validateNewPet(petData as IPet)
        const newPet = await addNewPetQuery({
            ownerId,
            petName,
            type,
            petImage,
            dob,
            gender,
            healthStatus,
            adoptionStatus
        })
        
        res.status(201).json({
            message: "new pet created successfully.",
            data: newPet
        })
    } catch (error) {
        next(error)
    }
}
export default addNewPet