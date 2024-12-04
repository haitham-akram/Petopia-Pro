import { type Request } from "express";

interface IOldPostRequest {
    SearcWord: string;
    categoryNum: number | 0;
}

interface CustomSearchPostRequest extends Request {
  SearchData?: IOldPostRequest;
}

export type { IOldPostRequest, CustomSearchPostRequest };
