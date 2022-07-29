/** @format */

import { vEmptyString, vOptionalString } from "./../../../../lib/validators";

/** @format */

import { uuid } from "uuidv4";
import User from "../User";
import Task from "./Task";

export default class List {
  private readonly _id: string;
  private readonly _user: User;
  private _title: string;
  private _titleColor?: string;
  private _color?: string;
  private readonly _tasks: Task[];

  constructor(user: User, title: string, titleColor?: string, color?: string) {
    this._id = uuid();
    this._user = user;
    this._title = title;
    this._titleColor = titleColor;
    this._color = color;

    this._tasks = [];
  }
  public get tasks(): Task[] {
    return this._tasks;
  }

  public get id(): string {
    return this._id;
  }
  public get user(): User {
    return this._user;
  }
  public get title(): string {
    return this._title;
  }

  public get titleColor(): string | undefined {
    return this._titleColor;
  }

  public get color(): string | undefined {
    return this._color;
  }

  public set title(value: string) {
    this._title = vEmptyString.parse(value);
  }
  public set titleColor(value: string | undefined) {
    this._titleColor = vOptionalString.parse(value);
  }

  public set color(value: string | undefined) {
    this._color = vOptionalString.parse(value);
  }
}
