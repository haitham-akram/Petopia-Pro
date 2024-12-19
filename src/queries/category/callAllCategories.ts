import Category from "../../database/schemas/categorySchema";
// Call old Categories query

const callAllCategories = async () => {
  // Find the Categories in the database
  const allCategories = Category.find();
  return await allCategories;
};

export default callAllCategories;
