import Pet from "../../database/schemas/petSchema";

// call old Pet by query
const callOnePetById = async ({ petId }: { petId: string }) => {
  const calledPet = Pet.findById(petId);
  return await calledPet;
};

export default callOnePetById;
