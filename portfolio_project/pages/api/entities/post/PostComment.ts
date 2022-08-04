/** @format */

/** @format */
import { vEmptyString, vId } from "./../../../../lib/validators";

import PostReactionEntity from "./PostReactions";
import { Comment } from "@prisma/client";

export default class CommentEntity {
  private readonly _id: string;
  private readonly _userId: string;
  private readonly _postId: string;
  private _content: string = "";
  private readonly _publishedAt: Date;

  constructor({ userId, postId, content, publishedAt, id }: Comment) {
    this._id = vId.parse(id);
    this._userId = vId.parse(userId);
    this._postId = vId.parse(postId);
    this._publishedAt = publishedAt ?? new Date(Date.now());
    this.content = content;
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
  public get userId(): string {
    return this._userId;
  }
  public get postId(): string {
    return this._postId;
  }
  public set content(value: string) {
    this._content = vEmptyString.parse(value);
  }
}
