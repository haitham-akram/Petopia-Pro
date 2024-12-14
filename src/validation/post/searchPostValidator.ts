import * as Yup from "yup";
import { yupNumber, yupString } from "../YupBasics";

async function SearchWordValidator(SearchWord: {
  SearchWord: string;
  CategoryNum?: number;
}) {
  const schema = Yup.object().shape({
    SearchWord: yupString.required("enter the word of search."),
    CategoryNum: yupNumber,
  });

  const result = await schema.validate(SearchWord, { abortEarly: false });

  return result;
}

export default SearchWordValidator;
