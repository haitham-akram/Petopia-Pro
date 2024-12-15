interface IUpdatePost {
  images?:
    | {
        url?: string;
      }[]
    | undefined;
  categoryId?: number;
  petId?: string;
  productId?: string;
  postContent?: string;
}

export default IUpdatePost;
