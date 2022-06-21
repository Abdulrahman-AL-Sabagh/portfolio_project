/** @format */

import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.ACCESS_TOKEN;
    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "secret");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("NOT A REAL USER");
        }
      } catch (e) {
        res.status(401);
        res.json({ error: "Not Authorizied" });
        return;
      }
      return handler;
    }
    res.status(401)
    res.json({ error: 'Not Authorizied' })
  };
};

export const validateToken = (token) => {
    const user = jwt.verify(token, 'hello')
    return user
  }
  