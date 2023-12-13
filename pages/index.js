import { axiosOpen } from "@/utils/service";
import React, { useEffect, useState } from "react";
import Carousel from "./component/Carousel";
import List from "./component/List";

const index = () => {
  return (
    <div className="">
      <List type={"movie"} />
      <div className="h-24"></div>
      <List type={"tvSeries"} />
    </div>
  );
};

export default index;
