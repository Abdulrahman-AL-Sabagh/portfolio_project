/** @format */

import { Like } from "@prisma/client";
import { vId } from "@lib/validators";

export default class LikeEntity {
  private readonly _userId: string;
  private readonly _postId: string;
  constructor({ userId, postId }: Like) {
    this._userId = vId.parse(userId);
    this._postId = vId.parse(postId);
  }
  public get userId() {
    return this._userId;
  }
  public get postId() {
    return this._postId;
  }
}
