/** @format */

import { vOptionalString, vEmptyString, vDeadline, vId } from "@lib/validators";
import { Task } from "@prisma/client";

export default class TaskEntity {
  readonly #id: string;
  #title: string;
  #description: string | null = "";
  #deadLine: Date | null = null;
  #titleColor: string | null = "";
  readonly #listId: string;
  constructor({ id, title, listId, deadLine, titleColor, description }: Task) {
    // vId.parse(id);
    this.#id = vId.parse(id);
    this.#listId = vId.parse(listId);
    this.#title = title;
    this.description = description;
    this.deadLine = deadLine;
    this.titleColor = titleColor;
  }

  public get listId(): string {
    return this.#listId;
  }

  public get titleColor(): string | null {
    return this.#titleColor;
  }

  public get deadLine(): Date | null {
    return this.#deadLine;
  }

  public get description(): string | null {
    return this.#description;
  }

  public get title(): string {
    return this.#title;
  }

  public get id(): string {
    return this.#id;
  }

  public set description(value: string | null) {
    this.#description = vOptionalString.parse(value);
  }

  public set title(value: string) {
    this.#title = vEmptyString.parse(value);
  }

  public set deadLine(value: Date | null) {
    this.#deadLine = vDeadline.parse(value);
  }

  public set titleColor(value: string | null) {
    this.#titleColor = vOptionalString.parse(value);
  }
}
