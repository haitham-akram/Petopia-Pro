import Category from "../../database/schemas/categorySchema";
// Call old one Category query
const callOneCategory = async (categoryId: number) => {
  // Find the Category by id in the database
  const category = Category.findOne({ categoryId });
  return await category;
};

export default callOneCategory;
