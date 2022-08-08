/** @format */
import { Bookmark } from "@prisma/client";
import { vId } from "../../../../lib/validators";

export default class BookmarkEntity {
  private readonly _userId: string;
  private readonly _postId: string;
  constructor({ userId, postId }: Bookmark) {
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
