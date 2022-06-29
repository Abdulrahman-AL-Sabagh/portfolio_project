/** @format */
import { url } from "inspector";
import jwt, { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { NextRequest, NextResponse } from "next/server";
const Home = ({ token }) => {
  const {name,email} = verify(token.ACCESS_TOKEN,process.env.TOKEN)
  console.log(verify(token.ACCESS_TOKEN,process.env.TOKEN));
  return <div>Hello {name}</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: { token: req.cookies } };
};
