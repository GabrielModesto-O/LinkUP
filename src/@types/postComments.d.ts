import { User } from "./user";

export interface postComments {
    id: string;
    postId:string;
    authorId:string;
    content:String;
    created_at?:string;
    author:User;
};