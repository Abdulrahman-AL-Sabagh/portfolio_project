/** @format */

import Post from "./Post";
import User from "../User";
import PostReaction from "./PostReactions";

export default class Like extends PostReaction {
  constructor(user: User, post: Post) {
    super(user, post);
  }
}
