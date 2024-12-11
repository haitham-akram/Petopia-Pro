import { type Request } from "express";

interface INewPostRequest {
  userId: string;
  // isAdmin
  categoryId: number;
  postContent: string;
  isHaveImg: boolean;
  likesCount: number;
  commentsCount: number;
  images?: [
    {
      url: string;
    }
  ];
}

interface CustomAddPostRequest extends Request {
  PostData?: INewPostRequest;
}

export type { INewPostRequest, CustomAddPostRequest };
