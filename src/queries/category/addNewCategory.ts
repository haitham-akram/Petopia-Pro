import Category from "../../database/schemas/categorySchema";
// Add new Category query

interface INewCategory {
  _id: number;
  title: string;
}

const addNewCategory = async (CategoryData: INewCategory) => {
  // Save the Category to the database
  const newCategory = new Category(CategoryData);
  return await newCategory.save();
};

export default addNewCategory;
