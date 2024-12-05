interface IPost {
  images?:
    | {
        url?: string;
      }[]
    | undefined;
  userId: string;
  categoryId: number;
  petId?: string;
  productId?: string;
  postContent: string;
  likesCount: number;
  commentsCount: number;
}

export default IPost;
