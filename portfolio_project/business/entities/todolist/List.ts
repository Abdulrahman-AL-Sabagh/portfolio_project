/** @format */

import { vEmptyString, vId, vOptionalString } from "@lib/validators";
import Task from "./Task";
import { List } from "@prisma/client";

export default class ListEntity {
  readonly #id: string;
  readonly #userId: string;
  #title: string = "";
  #titleColor: string | null = "";
  #color: string | null = "";
  readonly #tasks: Task[];

  constructor({ id, userId, title, titleColor, color }: List) {
    this.#id = vId.parse(id);
    this.#userId = vId.parse(userId);
    this.title = title;
    this.titleColor = titleColor;
    this.color = color;

    this.#tasks = [];
  }
  public get tasks(): Task[] {
    return this.#tasks;
  }

  public get id(): string {
    return this.#id;
  }
  public get userId(): string {
    return this.#userId;
  }
  public get title(): string {
    return this.#title;
  }

  public get titleColor(): string | null {
    return this.#titleColor;
  }

  public get color(): string | null {
    return this.#color;
  }

  public set title(value: string) {
    this.#title = vEmptyString.parse(value);
  }
  public set titleColor(value: string | null) {
    this.#titleColor = vOptionalString.parse(value);
  }

  public set color(value: string | null) {
    this.#color = vOptionalString.parse(value);
  }
}
