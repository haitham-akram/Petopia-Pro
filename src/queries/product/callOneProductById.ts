import { Types } from "mongoose";
import Product from "../../database/schemas/productSchema";

// call old Product by query with user data lookup
const callOneProductById = async (productId: string) => {
  const productDataProject = {
    _id: 1,
    title: 1,
    stock: 1,
    price: 1,
    details: 1,
    rating: 1,
  };

  const calledProduct = await Product.aggregate([
    { $match: { _id: new Types.ObjectId(productId) } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        ...productDataProject,
        "userData.fullName": 1,
        "userData.email": 1,
        "userData.userImage": 1,
      },
    },
  ]);

  return calledProduct[0];
};

export default callOneProductById;
