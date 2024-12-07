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
  likesCount?: number;
  commentsCount?: number;
}

export default IUpdatePost;
