/** @format */

import { vOptionalString, vEmptyString } from "./../../../../lib/validators";
import User from "../User";
import Bookmark from "./Bookmark";
import Like from "./Like";
import PostComment from "./PostComment";
import { uuid } from "uuidv4";

export default class Post {
  readonly #id: string;
  readonly #user: User;
  #title?: string;
  #description: string;
  #image?: string;
  #likes: Like[];
  readonly #bookmarks: Bookmark[];
  readonly #comments: PostComment[];

  constructor(user: User, description: string, title?: string, image?: string) {
    this.#id = uuid();
    this.#user = user;
    this.#title = title;
    this.#description = description;
    this.#image = image;

    this.#likes = [];
    this.#bookmarks = [];
    this.#comments = [];
  }

  public get id(): string {
    return this.#id;
  }

  public get user(): User {
    return this.#user;
  }

  public get title(): string | undefined {
    return this.#title;
  }

  public get description(): string {
    return this.#description;
  }

  public get image(): string | undefined {
    return this.#image;
  }

  public get likes(): Like[] {
    return this.#likes;
  }

  public get bookmarks(): Bookmark[] {
    return this.#bookmarks;
  }

  public get comments(): PostComment[] {
    return this.#comments;
  }

  public set title(title: string | undefined) {
    this.#title = vOptionalString.parse(title);
  }
  public set image(image: string | undefined) {
    this.#image = vOptionalString.parse(image);
  }
  public set description(description: string) {
    this.description = vEmptyString.parse(description);
  }
}
