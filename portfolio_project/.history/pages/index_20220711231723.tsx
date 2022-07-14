/** @format */
import { url } from "inspector";
import jwt, { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { NextRequest, NextResponse } from "next/server";
import { FC } from "react";
const Home: FC<{ token: { ACCESS_TOKEN: string } }> = ({ token }) => {
  console.log(Object.keys(verify(token, )))
  const { name, email } = verify(
    token.ACCESS_TOKEN,
    process.env.NEXT_PUBLIC_TOKEN as string
  );

  return <div>Hello {name}</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: { token: req.cookies } };
};
