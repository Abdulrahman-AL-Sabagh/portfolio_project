import type { NextPage } from "next";
import { useState } from "react";
import TextField from "../components/Textfield";

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return <div className="bg-gray"></div>;
};
const Modal = ({
  open,
  children,
}: {
  open: boolean;
  children: JSX.Element[];
}) => {
  return open ? (
    <div className="z-10 flex flex-col gap-6 p-4 absolute w-1/2 h-fit top-1/4 left-1/4 bg-gray-700">
      <h1>Modal</h1> {children}
    </div>
  ) : null;
};

export default Home;
