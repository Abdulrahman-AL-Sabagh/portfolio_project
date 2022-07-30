import { LikedPost } from '@prisma/client';
/** @format */

import PostReactionEntity from "./PostReactions";

export default class LikeEntity extends PostReactionEntity {
  constructor(like: LikedPost) {
    super(like);
  }
}
