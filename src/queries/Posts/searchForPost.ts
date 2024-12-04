import Post from "../../database/schemas/postSchema";

// call old Post by query
const SearchForPost = async ({
  SearchWord,
  categoryNum = 0,
}: {
  SearchWord: string;
  categoryNum?: number;
}) => {
  // Write here the query to search a word in the post content and have the category number
  const calledPost = () => Post.where();
  return await calledPost;
};

export default SearchForPost;
