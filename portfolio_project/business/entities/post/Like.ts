/** @format */

import { Like } from "@prisma/client";
import { vId } from "@lib/validators";

export default class LikeEntity {
  readonly #userId: string;
  readonly #postId: string;
  constructor({ userId, postId }: Like) {
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
