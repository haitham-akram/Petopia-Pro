import Pet from "../../database/schemas/petSchema";

// call old Pet by query
const callOnePetById = async (petId: string) => {
  const calledPet = await Pet.findById(petId);
  return calledPet;
};

export default callOnePetById;
