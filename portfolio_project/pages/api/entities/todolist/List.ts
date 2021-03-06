/** @format */

import { vEmptyString, vOptionalString } from "./../../../../lib/validators";

/** @format */

import { uuid } from "uuidv4";
import Task from "./Task";
import { List } from "@prisma/client";

export default class ListEntity {
  private readonly _id: string;
  private readonly _userId: string;
  private _title: string;
  private _titleColor: string | null;
  private _color: string | null;
  private readonly _tasks: Task[];

  constructor({ userId, title, titleColor, color }: List) {
    this._id = uuid();
    this._userId = userId;
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
  public get userId(): string {
    return this._userId;
  }
  public get title(): string {
    return this._title;
  }

  public get titleColor(): string | null {
    return this._titleColor;
  }

  public get color(): string | null {
    return this._color;
  }

  public set title(value: string) {
    this._title = vEmptyString.parse(value);
  }
  public set titleColor(value: string | null) {
    this._titleColor = vOptionalString.parse(value);
  }

  public set color(value: string | null) {
    this._color = vOptionalString.parse(value);
  }
}
