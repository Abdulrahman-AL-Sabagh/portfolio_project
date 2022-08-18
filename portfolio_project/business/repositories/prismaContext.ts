/** @format */

import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

export type Context = {
  db: PrismaClient;
};

export type MockContext = {
  db: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    db: mockDeep<PrismaClient>(),
  };
};
