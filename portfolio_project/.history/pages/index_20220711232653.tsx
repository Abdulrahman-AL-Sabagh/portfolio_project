/** @format */
import { url } from "inspector";
import jwt, { Secret, verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { NextRequest, NextResponse } from "next/server";
import { FC } from "react";
const Home: FC<{ token: { ACCESS_TOKEN: string } }> = ({
  token,
}) => {

  const tokenKey: Secret = process.env.NEXT_PUBLIC_TOKEN as Secret;
  console.log(Object.keys(jwt))
  const { name, email } = jwt.decode(token.);

  return <div>Hello {name}</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: { token: req.cookies } };
};