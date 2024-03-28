export interface User {
    id: string;
    uid:string;
    name: string;
    lastname: string;
    courseName: string;
    courseId?:string;
    photobase64?:string;
    country?:string;
    city?:string;
    birthday?:string;
    aboutMe?:string;
};