import Category from "../../database/schemas/categorySchema";
// Call old one Category query
const callOneCategory = async (id: number) => {
  // Find the Category by id in the database
  const category = Category.findById(id);
  return await category;
};

export default callOneCategory;
