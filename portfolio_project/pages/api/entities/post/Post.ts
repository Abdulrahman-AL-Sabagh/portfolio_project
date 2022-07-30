/** @format */

import { vOptionalString, vEmptyString } from "./../../../../lib/validators";
import BookmarkEntity from "./Bookmark";
import LikeEntity from "./Like";
import CommentEntity from "./PostComment";
import { Post } from "@prisma/client";

export default class PostEntity {
  readonly #id: string;
  readonly #userId: string | null;
  #title: string | null;
  #description: string;
  #publishedAt: Date | null;
  #image: string | null;
  #likes: LikeEntity[];
  readonly #bookmarks: BookmarkEntity[];
  readonly #comments: CommentEntity[];

  constructor({ id, userId, title, description, image, publishedAt }: Post) {
    this.#id = id;
    this.#userId = userId;
    this.#title = title;
    this.#description = description;
    this.#image = image;
    this.#publishedAt = publishedAt ?? new Date(Date.now());
    this.#likes = [];
    this.#bookmarks = [];
    this.#comments = [];
  }

  public get id(): string {
    return this.#id;
  }

  public get user(): string | null {
    return this.#userId;
  }

  public get title(): string | null {
    return this.#title;
  }

  public get description(): string {
    return this.#description;
  }

  public get image(): string | null {
    return this.#image;
  }

  public get likes(): LikeEntity[] {
    return this.#likes;
  }

  public get bookmarks(): BookmarkEntity[] {
    return this.#bookmarks;
  }

  public get comments(): CommentEntity[] {
    return this.#comments;
  }

  public set title(title: string | null) {
    this.#title = vOptionalString.parse(title);
  }
  public set image(image: string | null) {
    this.#image = vOptionalString.parse(image);
  }
  public set description(description: string) {
    this.description = vEmptyString.parse(description);
  }
}
