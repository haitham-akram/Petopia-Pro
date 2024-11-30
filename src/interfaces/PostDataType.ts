import { InferSchemaType } from "mongoose";
import Post from "../database/schemas/postSchema";
import PostImage from "../database/schemas/postImageSchema";

export type PostDataType = InferSchemaType<typeof Post>;
export type PostImageDataType = InferSchemaType<typeof PostImage>;