/** @format */
import { url } from "inspector";
import jwt, { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { NextRequest, NextResponse } from "next/server";
import { FC } from "react";
const Home:FC<{token: {ACCESS_TOKEN: string}}> = ({ token }) => {
  const {name,email} = verify(token.ACCESS_TOKEN,(process.env.TOKEN !== undefined && process.env.TOKEN))

  return <div>Hello {name}</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: { token: req.cookies } };
};
