import { axiosOpen } from "@/utils/service";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import spinner from "../../assets/spinner.png";

const List = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosOpen.get(
          `titles/x/upcoming?titleType=${type}&limit=20`
        );
        console.log(response);
        setData(response?.data?.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" ">
      <span className="text-2xl text-white  font-bold capitalize mx-36">
        <FontAwesomeIcon icon={faTicket} color="white" className="me-2" />{" "}
        {type}
        's
      </span>
      {loading ? (
        <div
          className="flex items-center justify-center h-full"
          style={{ maxHeight: "89.6vh" }}
        >
          <div className="text-2xl text-white me-2">Loading . . .</div>
          <Image
            src={spinner}
            className="animate-spin"
            width={40}
            height={40}
          />
        </div>
      ) : (
        <div className=" flex flex-wrap justify-center items-center ">
          {data && data.map((movie) => <Card data={movie} type={type} />)}
        </div>
      )}
    </div>
  );
};

export default List;
