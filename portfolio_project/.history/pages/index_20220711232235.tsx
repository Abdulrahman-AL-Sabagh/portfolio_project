/** @format */
import { url } from "inspector";
import jwt, { Secret, verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { NextRequest, NextResponse } from "next/server";
import { FC } from "react";
const Home: FC<{ token: { ACCESS_TOKEN: string } }> = ({ token: {ACCESS_TOKEN} }) => {
  console.log(typeof process.env.NEXT_PUBLIC_TOKEN)
  const token
  const { name, email } = verify(
    ACCESS_TOKEN,
    process.env.NEXT_PUBLIC_TOKEN
  );

  return <div>Hello {name}</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: { token: req.cookies } };
};
