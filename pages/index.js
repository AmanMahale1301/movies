import React from "react";
import Carousel from "./component/Carousel";
import List from "./component/List";
import { useSession } from "next-auth/react";

const index = () => {
  const { data: session } = useSession();

  return (
    <div className="">
      {session?.user ? <Carousel /> : null}

      <div className="h-24"></div>
      <List type={"movie"} />
      <div className="h-24"></div>
      <List type={"tvSeries"} />
      <div className="h-4"></div>
    </div>
  );
};

export default index;
