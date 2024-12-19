import * as Yup from "yup";
import { yupNumber, yupString } from "../YupBasics";
import INewProdcut from "../../interfaces/NewProductInterface";

async function newProductDataValidator(ProductData: INewProdcut) {
  const schema = Yup.object().shape({
    userId: yupString.required("You need to login first before posting."),
    title: yupString.required("The title must be added first."),
    price: yupNumber
      .min(1, "Less than 1$ are not possible as a price.")
      .max(200, "More than 200$ are not possible as a price.")
      .required("Put a Price on the product to notify the customers."),
    stock: yupNumber
      .min(1, "Must have in the stock to post the Product.")
      .max(200, "More than 200 are not available for stock value.")
      .default(1),
    details: yupString.required(
      "You must descripe before posting the product."
    ),
    rating: yupNumber.transform(() => 0),
  });

  const result = await schema.validate(ProductData, { abortEarly: false });

  return result;
}

export default newProductDataValidator;
