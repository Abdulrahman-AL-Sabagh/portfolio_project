/** @format */
import { BookmarkedPost } from "@prisma/client";

import PostReactionEntity from "./PostReactions";

export default class BookmarkEntity extends PostReactionEntity {
  constructor(bookmark: BookmarkedPost) {
    super(bookmark);
  }
}
