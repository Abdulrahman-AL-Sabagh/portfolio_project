/** @format */
import jwt from "jsonwebtoken";
import { GetServerSideProps } from "next";
const Home = () => {
  return <div> Hello  </div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: { token: req.cookies } };
};
