import { User } from "./user";

export interface Post {
    id?:string;
    description:string;
    photobase64?:string; 
    likesQuantity:number;
    commentsQuantity:number; 
    comments?:string[];
    author:User
}