/** @format */

import User from "../User";
import Post from "./Post"
import PostReaction from "./PostReactions";

export default class Bookmark extends PostReaction {
  constructor(user: User, post: Post) {
    super( user, post);
  }
}
