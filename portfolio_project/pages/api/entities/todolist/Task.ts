/** @format */

import List from "./List";
import { uuid } from "uuidv4";
import {
  vOptionalString,
  vEmptyString,
  vDeadline,
} from "../../../../lib/validators";

export default class Task {
  private readonly _id: string;
  private _title: string;
  private _description?: string;
  private _deadLine?: Date;
  private _titleColor?: string;
  private readonly _list: List;
  constructor(
    id: string,
    title: string,
    list: List,
    deadLine?: Date,
    titleColor?: string,
    description?: string
  ) {
    // vId.parse(id);
    this._id = uuid();
    this._list = list;
    this._title = title;
    this.description = description;
    this.deadLine = deadLine;
    this.titleColor = titleColor;
  }

  public get list(): List {
    return this._list;
  }
  
  public get titleColor(): string | undefined {
    return this._titleColor;
  }

  public get deadLine(): Date | undefined {
    return this._deadLine;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public get title(): string {
    return this._title;
  }

  public get id(): string {
    return this._id;
  }

  public set description(value: string | undefined) {
    this._description = vOptionalString.parse(value);
  }

  public set title(value: string) {
    this._title = vEmptyString.parse(value);
  }

  public set deadLine(value: Date | undefined) {
    this._deadLine = vDeadline.parse(value);
  }

  public set titleColor(value: string | undefined) {
    this._titleColor = vOptionalString.parse(value);
  }
}
