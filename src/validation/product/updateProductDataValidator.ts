import * as Yup from "yup";
import { yupNumber, yupString } from "../YupBasics";
import IUpdateProdcut from "../../interfaces/UpdateProductInterface";

async function updateProductDataValidator(ProductData: IUpdateProdcut) {
  const schema = Yup.object().shape({
    title: yupString,
    price: yupNumber
      .min(1, "Less than 1$ are not possible as a price.")
      .max(200, "More than 200$ are not possible as a price."),
    stock: yupNumber
      .min(1, "Must have in the stock to post the Product.")
      .max(200, "More than 200 are not available for stock value."),
    details: yupString,
    rating: yupNumber.transform(() => 0),
  });

  const result = await schema.validate(ProductData, { abortEarly: false });

  return result;
}

export default updateProductDataValidator;
