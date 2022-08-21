/** @format */

import { ResponseError } from "@repos/repo_types";

const err = { data: null, error: true } as { data: null; error: true };

export const userNotFound: ResponseError = {
  ...err,
  message: "User not found",
};
export const postNotFound: ResponseError = {
  ...err,
  message: "Post not found",
};

export const listNotFound: ResponseError = {
  ...err,
  message: "List not found",
};

export const taskNotFound: ResponseError = {
  ...err,
  message: "Task not found",
};

export const commentNotFound: ResponseError = {
  ...err,
  message: "Comment not found",
};

export const emailTaken: ResponseError = { ...err, message: "Email taken" };
export const invalidID: ResponseError = { ...err, message: "Invalid id" };
export const invalidSearchParam: ResponseError = {
  ...err,
  message: "Invalid search param",
};

export const UserOrPostNotFound: ResponseError = {
  ...err,
  message: "User or Post not found",
};
