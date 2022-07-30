/** @format */

import { BookmarkedPost, LikedPost } from "@prisma/client";
/** @format */

export default class PostReactionEntity {
  private readonly _user: string | null;
  private readonly _post: string | null;

  constructor({ userId, postId }: BookmarkedPost | LikedPost) {
    this._user = userId;
    this._post = postId;
  }

  public get user(): string | null {
    return this._user;
  }
  public get post(): string | null {
    return this._post;
  }
}
