interface IPost {
  images?:
    | {
        url: string;
      }[]
    | undefined;
  userId: string;
  categoryId: number;
  postContent: string;
  likesCount: number;
  commentsCount: number;
}

export default IPost;
