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

import List from "./todolist/List";
import Post from "./post/Post";
import Like from "./post/Like";
import Bookmark from "./post/Bookmark";
import PostComment from "./post/PostComment";
import { uuid } from "uuidv4";
const enum GENDER {
  M = "M",
  W = "W",
}
const enum STATUS {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
}

interface UserTypes {
  readonly _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  profileBackground?: string;
  birthday?: Date;
  job?: string;
  location?: string;
  status?: STATUS;
  gender?: GENDER;
  aboutUser?: string;
}

export default class User {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _avatar?: string;
  private _profileBackground?: string;
  private _birthday?: Date;
  private _job?: string;
  private _location?: string;
  private _status?: STATUS;
  private _gender?: GENDER;
  private _aboutUser?: string;

  private readonly lists: List[];
  private readonly posts: Post[];
  private readonly likes: Like[];
  private readonly bookmarks: Bookmark[];
  private readonly friends: User[];
  private readonly comments: PostComment[];

  constructor(user: UserTypes) {
    const {
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

    this._id = uuid();
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

    this.lists = [];
    this.posts = [];
    this.likes = [];
    this.bookmarks = [];
    this.friends = [];
    this.comments = [];
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
  public get avatar(): string | undefined {
    return this._avatar;
  }
  public get profileBackground(): string | undefined {
    return this._profileBackground;
  }
  public get birthday() {
    return this._birthday;
  }
  public get job(): string | undefined {
    return this._job;
  }
  public get location(): string | undefined {
    return this._location;
  }
  public get status(): STATUS | undefined {
    return this._status;
  }
  public get gender(): GENDER | undefined {
    return this._gender;
  }
  public get aboutUser(): string | undefined {
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
  public set avatar(value: string | undefined) {
    this._avatar = vUrl.parse(value);
  }
  public set profileBackground(value: string | undefined) {
    this._profileBackground = vUrl.parse(value);
  }
  public set birthday(value: Date | undefined) {
    this._birthday = vBirthday.parse(value);
  }
  public set job(value: string | undefined) {
    this._job = vOptionalName.parse(value);
  }
  public set location(value: string | undefined) {
    this._location = vOptionalName.parse(value);
  }
  public set status(value: STATUS | undefined) {
    this._status = value;
  }
  public set gender(value: GENDER | undefined) {
    this._gender = value;
  }
  public set aboutUser(value: string | undefined) {
    this._aboutUser = vEmptyString.parse(value);
  }
}
