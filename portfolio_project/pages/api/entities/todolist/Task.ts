/** @format */
import { uuid } from "uuidv4";
import {
  vOptionalString,
  vEmptyString,
  vDeadline,
} from "@lib/validators";
import { Task } from "@prisma/client";

export default class TaskEntity {
  private readonly _id: string;
  private _title: string;
  private _description: string | null;
  private _deadLine: Date | null;
  private _titleColor: string | null;
  private readonly _listId: string;
  constructor({ id, title, listId, deadLine, titleColor, description }: Task) {
    // vId.parse(id);
    this._id = uuid();
    this._listId = listId;
    this._title = title;
    this._description = description ?? null;
    this._deadLine = deadLine ?? null;
    this._titleColor = titleColor ?? null;
  }

  public get listId(): string {
    return this._listId;
  }

  public get titleColor(): string | null {
    return this._titleColor;
  }

  public get deadLine(): Date | null {
    return this._deadLine;
  }

  public get description(): string | null {
    return this._description;
  }

  public get title(): string {
    return this._title;
  }

  public get id(): string {
    return this._id;
  }

  public set description(value: string | null) {
    this._description = vOptionalString.parse(value);
  }

  public set title(value: string) {
    this._title = vEmptyString.parse(value);
  }

  public set deadLine(value: Date | null) {
    this._deadLine = vDeadline.parse(value);
  }

  public set titleColor(value: string | null) {
    this._titleColor = vOptionalString.parse(value);
  }
}
