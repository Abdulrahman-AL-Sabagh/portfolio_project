/** @format */

/** @format */
import { vEmptyString, vId } from "@lib/validators";
import { Comment } from "@prisma/client";

export default class CommentEntity {
  readonly #id: string;
  readonly #userId: string;
  readonly #postId: string;
  readonly #publishedAt: Date;
  #content: string = "";

  constructor({ userId, postId, content, publishedAt, id }: Comment) {
    this.#id = vId.parse(id);
    this.#userId = vId.parse(userId);
    this.#postId = vId.parse(postId);
    this.#publishedAt = publishedAt ?? new Date(Date.now());
    this.content = content;
  }

  public get publishedAt(): Date {
    return this.#publishedAt;
  }
  public get content(): string {
    return this.#content;
  }
  public get id(): string {
    return this.#id;
  }
  public get userId(): string {
    return this.#userId;
  }
  public get postId(): string {
    return this.#postId;
  }
  public set content(value: string) {
    this.#content = vEmptyString.parse(value);
  }
}
