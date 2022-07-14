/** @format */
import { url } from "inspector";
import jwt, { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { NextRequest, NextResponse } from "next/server";
import { FC } from "react";
const Home: FC<{ token: { ACCESS_TOKEN: string } }> = ({ token: {ACCESS_TOKEN} }) => {
  console.log()
  const { name, email } = verify(
    token,
    process.env.NEXT_PUBLIC_TOKEN
  );

  return <div>Hello {name}</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: { token: req.cookies.ACCESS_TOKEN } };
};
