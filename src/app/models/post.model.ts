import { User } from "./user.model";

export enum Status {
    PENDING, 
    APPROVED,
  }

export interface Comment {
    _id: String,
    author: String,
    comment: String,
    createdAt: Date
}


export interface Post {
    _id: String,
    author: User,
    tittle: String,
    content: String,
    imageUrl?: String,
    createdAt?: Date,
    updateAt?: Date,
    status: Status,
    comments: [Array<Comment>]
}
