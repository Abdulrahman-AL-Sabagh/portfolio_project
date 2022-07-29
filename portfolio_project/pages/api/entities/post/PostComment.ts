/** @format */
import { vEmptyString } from "./../../../../lib/validators";
import User from "../User";
import Post from "./Post";
import PostReaction from "./PostReactions";

export default class PostComment extends PostReaction {
  private _content: string;
  private readonly _publishedAt: Date;

  constructor(user: User, post: Post, content: string) {
    super(user, post);
    this._publishedAt = new Date(Date.now());
    this._content = content;
  }

  public get publishedAt(): Date {
    return this._publishedAt;
  }
  public get content(): string {
    return this._content;
  }
  public set content(value: string) {
    this._content = vEmptyString.parse(value);
  }
}
