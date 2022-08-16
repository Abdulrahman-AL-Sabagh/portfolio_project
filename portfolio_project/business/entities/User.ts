/** @format */

import { vOptionalString } from "@lib/validators";
/** @format */

import {
  vName,
  vUrl,
  vBirthday,
  vOptionalName,
  vPassword,
  vEmail,
  vId,
} from "@lib/validators";

import ListEntity from "./todolist/List";
import PostEntity from "./post/Post";
import LikeEntity from "./post/Like";
import BookmarkEntity from "./post/Bookmark";
import CommentEntity from "./post/PostComment";
import { User, Gender, Status } from "@prisma/client";

export default class UserEntity {
  readonly #id: string;
  #name: string = "";
  #email: string = "";
  #password: string = "";
  #avatar: string | null = null;
  #profileBackground: string | null = null;
  #birthday: Date | null = null;
  #job: string | null = null;
  #location: string | null = null;
  #status: Status | null = null;
  #gender: Gender | null = null;
  #aboutUser: string | null = null;

  private readonly _lists: ListEntity[];
  private readonly _posts: PostEntity[];
  private readonly _likes: LikeEntity[];
  private readonly _bookmarks: BookmarkEntity[];
  private readonly _friends: UserEntity[];
  private readonly _comments: CommentEntity[];

  constructor(user: User) {
    const {
      id,
      name,
      email,
      password,
      avatar,
      profileBackground,
      birthday,
      job,
      location,
      status,
      gender,
      aboutUser,
    } = user;

    this.#id = vId.parse(id);
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.profileBackground = profileBackground;
    this.birthday = birthday;
    this.job = job;
    this.location = location;
    this.status = status;
    this.gender = gender;
    this.aboutUser = aboutUser;

    this._lists = [];
    this._posts = [];
    this._likes = [];
    this._bookmarks = [];
    this._friends = [];
    this._comments = [];
  }

  public get id(): string {
    return this.#id;
  }
  public get lists(): ListEntity[] {
    return this._lists;
  }
  public get posts(): PostEntity[] {
    return this._posts;
  }
  public get likes(): LikeEntity[] {
    return this._likes;
  }
  public get bookmarks(): BookmarkEntity[] {
    return this._bookmarks;
  }
  public get friends(): UserEntity[] {
    return this._friends;
  }
  public get comments(): CommentEntity[] {
    return this._comments;
  }

  public get name(): string {
    return this.#name;
  }
  public get email(): string {
    return this.#email;
  }
  public get password(): string {
    return this.#password;
  }
  public get avatar(): string | null {
    return this.#avatar;
  }
  public get profileBackground(): string | null {
    return this.#profileBackground;
  }
  public get birthday() {
    return this.#birthday;
  }
  public get job(): string | null {
    return this.#job;
  }
  public get location(): string | null {
    return this.#location;
  }
  public get status(): Status | null {
    return this.#status;
  }
  public get gender(): Gender | null {
    return this.#gender;
  }
  public get aboutUser(): string | null {
    return this.#aboutUser;
  }

  public set name(value: string) {
    this.#name = vName.parse(value);
  }
  public set email(value: string) {
    this.#email = vEmail.parse(value);
  }
  public set password(value: string) {
    this.#password = vPassword.parse(value);
  }
  public set avatar(value: string | null) {
    this.#avatar = vUrl.parse(value);
  }
  public set profileBackground(value: string | null) {
    this.#profileBackground = vUrl.parse(value);
  }
  public set birthday(value: Date | null) {
    this.#birthday = vBirthday.parse(value);
  }
  public set job(value: string | null) {
    this.#job = vOptionalName.parse(value);
  }
  public set location(value: string | null) {
    this.#location = vOptionalName.parse(value);
  }
  public set status(value: Status | null) {
    this.#status = value;
  }
  public set gender(value: Gender | null) {
    this.#gender = value;
  }
  public set aboutUser(value: string | null) {
    this.#aboutUser = vOptionalString.parse(value);
  }
}
