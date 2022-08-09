/** @format */

import { BookmarkedPost, LikedPost } from "@prisma/client";
/** @format */

export default class PostReactionEntity {
  private readonly _user: string;
  private readonly _post: string;

  constructor({ userId, postId }: BookmarkedPost | LikedPost) {
    this._user = userId;
    this._post = postId;
  }

  public get userId(): string | null {
    return this._user;
  }
  public get postId(): string | null {
    return this._post;
  }
}
