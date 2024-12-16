import { Types } from "mongoose";
import Pet from "../../database/schemas/petSchema";

// call old Pet by query
const callOnePetById = async (petId: Types.ObjectId | string) => {
  const calledPet = await Pet.findById(petId.toString());
  return calledPet;
};

export default callOnePetById;
