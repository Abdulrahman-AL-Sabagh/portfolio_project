/** @format */

/** @format */
import { vEmptyString } from "./../../../../lib/validators";

import PostReactionEntity from "./PostReactions";
import { Comment } from "@prisma/client";

export default class CommentEntity extends PostReactionEntity {
  private readonly _id: string;
  private _content: string;
  private readonly _publishedAt: Date;

  constructor({ userId, postId, content, publishedAt, id }: Comment) {
    super({ userId, postId });

    this._id = id;
    this._publishedAt = publishedAt ?? new Date(Date.now());
    this._content = content;
  }

  public get publishedAt(): Date {
    return this._publishedAt;
  }
  public get content(): string {
    return this._content;
  }
  public get id(): string {
    return this._id;
  }
  public set content(value: string) {
    this._content = vEmptyString.parse(value);
  }
}
