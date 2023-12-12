import { axiosOpen } from "@/utils/service";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const List = ({ type }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosOpen.get(
          `titles/x/upcoming?titleType=${type}&limit=20`
        );
        console.log(response);
        setData(response?.data?.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" ">
      <span className="text-2xl font-bold capitalize ms-24 underline">
        {type}'s
      </span>
      <div className=" flex flex-wrap justify-center items-center ">
        {data && data.map((movie) => <Card data={movie} />)}
      </div>
    </div>
  );
};

export default List;
