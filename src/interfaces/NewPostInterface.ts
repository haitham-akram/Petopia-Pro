interface INewPost {
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
}

export default INewPost;
