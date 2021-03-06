/** @format */
import { url } from "inspector";
import jwt, { Secret, verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { NextRequest, NextResponse } from "next/server";
import { FC } from "react";
const Home: FC<{ token: { ACCESS_TOKEN: string } }> = ({ token }) => {
  const { name, email } = jwt.decode(token.ACCESS_TOKEN) as {
    name: string;
    email: string;
  };

  return (
    <div>
      Hello {name} Your email is {email}
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: { token: req.cookies } };
};
