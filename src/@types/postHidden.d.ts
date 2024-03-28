import { Post } from "./posts";
import { User } from "./user";

export type PostHidden = {
    postId:string; 
    userId:string;
    created_at?:string;
    post:Post,
    author:User
}