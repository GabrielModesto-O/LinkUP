export type FriendRequest = {
    uid: string;
    name: string;
    lastName:string;
    courseName: string;
    courseId:number;
    photobase64: string;
    isSuggestion?:boolean;
    isRequested?: boolean;
  };