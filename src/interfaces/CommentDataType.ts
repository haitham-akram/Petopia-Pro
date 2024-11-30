import { InferSchemaType } from "mongoose";
import Comment from "../database/schemas/commentSchema";

// Comment schema model data type 

export type CommentDataType = InferSchemaType<typeof Comment>;