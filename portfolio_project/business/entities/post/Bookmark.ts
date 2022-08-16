/** @format */
import { Bookmark } from "@prisma/client";
import { vId } from "@lib/validators";

export default class BookmarkEntity {
   readonly #userId: string;
   readonly #postId: string;
  constructor({ userId, postId }: Bookmark) {
    this.#userId = vId.parse(userId);
    this.#postId = vId.parse(postId);
  }
  public get userId() {
    return this.#userId;
  }
  public get postId() {
    return this.#postId;
  }
}
