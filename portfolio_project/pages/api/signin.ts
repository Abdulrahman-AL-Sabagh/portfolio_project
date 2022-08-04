/** @format */

import jwt from "jsonwebtoken";
import prisma from "../../prisma";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  let user;

  user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,

      },
      process.env.TOKEN,
      { expiresIn: "2h" }
    );
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 2 * 3600,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "email or password are wrong" });
  }
};

export default handler;
