import { User } from "./user.model";

export enum Status {
    PENDING = "PENDING", 
    APPROVED = "APPROVED",
    DENIED = "DENIED",
  }

export interface Comment {
    _id?: string,
    author: string,
    comment: string,
    createdAt?: Date
}


export interface Post {
    _id?: string,
    author: User | string,
    tittle: string,
    content: string,
    imageUrl?: string,
    createdAt?: Date,
    updateAt?: Date,
    status?: Status,
    comments?: [Array<Comment>]
}
