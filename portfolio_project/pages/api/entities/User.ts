/** @format */

import {
  vName,
  vUrl,
  vBirthday,
  vOptionalName,
  vPassword,
  vEmail,
  vEmptyString,
} from "./../../../lib/validators";

import ListEntity from "./todolist/List";
import PostEntity from "./post/Post";
import LikeEntity from "./post/Like";
import BookmarkEntity from "./post/Bookmark";
import CommentEntity from "./post/PostComment";
import { User,Gender,Status } from "@prisma/client";


export default class UserEntity {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _avatar: string | null;
  private _profileBackground: string | null;
  private _birthday: Date | null;
  private _job: string | null;
  private _location: string | null;
  private _status: Status | null;
  private _gender: Gender | null;
  private _aboutUser: string | null;

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

    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._avatar = avatar;
    this._profileBackground = profileBackground;
    this._birthday = birthday;
    this._job = job;
    this._location = location;
    this._status = status;
    this._gender = gender;
    this._aboutUser = aboutUser;

    this._lists = [];
    this._posts = [];
    this._likes = [];
    this._bookmarks = [];
    this._friends = [];
    this._comments = [];
  }

  public get id(): string {
    return this._id;
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
    return this._name;
  }
  public get email(): string {
    return this._email;
  }
  public get password(): string {
    return this._password;
  }
  public get avatar(): string | null {
    return this._avatar;
  }
  public get profileBackground(): string | null {
    return this._profileBackground;
  }
  public get birthday() {
    return this._birthday;
  }
  public get job(): string | null {
    return this._job;
  }
  public get location(): string | null {
    return this._location;
  }
  public get status(): Status | null {
    return this._status;
  }
  public get gender(): Gender | null {
    return this._gender;
  }
  public get aboutUser(): string | null {
    return this._aboutUser;
  }

  public set name(value: string) {
    this._name = vName.parse(value);
  }
  public set email(value: string) {
    this._email = vEmail.parse(value);
  }
  public set password(value: string) {
    this.password = vPassword.parse(value);
  }
  public set avatar(value: string | null) {
    this._avatar = vUrl.parse(value);
  }
  public set profileBackground(value: string | null) {
    this._profileBackground = vUrl.parse(value);
  }
  public set birthday(value: Date | null) {
    this._birthday = vBirthday.parse(value);
  }
  public set job(value: string | null) {
    this._job = vOptionalName.parse(value);
  }
  public set location(value: string | null) {
    this._location = vOptionalName.parse(value);
  }
  public set status(value: Status | null) {
    this._status = value;
  }
  public set gender(value: Gender | null) {
    this._gender = value;
  }
  public set aboutUser(value: string | null) {
    this._aboutUser = vEmptyString.parse(value);
  }
}
