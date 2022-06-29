/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { name, email, password } = req.body;
  let user;
  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (error) {
    res.status(401);
    res.json({ error: `${error}` });
    return;
  }
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
  res.send({ msg: `user ${name} was created succesfully` });
};

export default handler;
