/** @format */

import { uuid } from "uuidv4";
import User from "../User";
import Post from "./Post";

export default class PostReaction {
  private readonly _id: string;
  private readonly _user: User;
  private readonly _post: Post;

  constructor(user: User, post: Post) {
    this._id = uuid();
    this._user = user;
    this._post = post;
  }

  public get id(): string {
    return this._id;
  }
  public get user(): User {
    return this._user;
  }
  public get post(): Post {
    return this._post;
  }
}
