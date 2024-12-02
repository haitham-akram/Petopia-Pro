import { type Request } from "express";

interface INewPostRequest {
  userId: string;
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

interface CustomPostRequest extends Request {
  PostData?: INewPostRequest;
}

export type { INewPostRequest, CustomPostRequest };
