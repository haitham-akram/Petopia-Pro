interface INewComment {
  userId: string;
  postId: string;
  commentText: string;
  createdAt: Date;
  updatedAt: Date;
}

export default INewComment;
