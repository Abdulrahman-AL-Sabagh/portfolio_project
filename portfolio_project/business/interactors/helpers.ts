/** @format */

import { vEmptyString, vId } from "@lib/validators";
import { InteractionParams, ResponseError, Schemas } from "@repos/repo_types";
import postInteractor from "./post_interactor";
import userInteractor from "./user_interactor";
import { Context } from "@repos/prismaContext";
import { Prisma } from "@prisma/client";
export const checkIfUserAndPostExists = async ({
  data,
  ctx,
}: InteractionParams): Promise<boolean> => {
  const { userId, postId } = data;
  const postParams = { id: postId, ctx };
  const userParams = { id: userId, ctx };

  const userExists = await userInteractor.checkIfUserExists(userParams);
  if (!userExists) return false;

  const postExists = await postInteractor.checkIfPostExists(postParams);
  if (!postExists) return false;

  return true;
};

export const validateId = async (id: string): Promise<boolean> => {
  const validId = vId.safeParse(id);
  if (validId.success) return true;
  return false;
};

export const validateText = async (text: string): Promise<boolean> => {
  const validText = vEmptyString.safeParse(text);
  if (validText.success) return true;
  return false;
};
