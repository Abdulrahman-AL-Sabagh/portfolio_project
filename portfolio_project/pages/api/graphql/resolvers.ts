/** @format */



import list from "./resolvers/queries/list_related/list";
import task from "./resolvers/queries/list_related/task";
import bookmarkedPost from "./resolvers/queries/post_related/bookmarked_post";
import comment from "./resolvers/queries/post_related/comment";
import post from "./resolvers/queries/post_related/post";
import queryResolver from "./resolvers/queries/query";
import friend from "./resolvers/queries/user_related/friend";
import user from "./resolvers/queries/user_related/user";


/** @format */

let resolvers = {
  Query: queryResolver,
  User: user,
  Friend: friend,
  Post: post,
  BookmarkedPost: bookmarkedPost,
  Comment: comment,
  List: list,
  Task: task,
};

export default resolvers;

//TODO add other social media later
