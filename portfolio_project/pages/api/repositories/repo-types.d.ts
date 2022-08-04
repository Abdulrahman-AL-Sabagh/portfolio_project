/** @format */

import { PrismaClient } from "@prisma/client";
import { OperationCanceledException } from "typescript";
import prisma from "../../../lib/prisma";


type UserDelegate = Prisma.UserDelegate<
Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>

export type UserRepoFunctions = Pick<
  UserDelegate,
  "create" | "findUnique" | "update" | "findMany" | "delete"
>;