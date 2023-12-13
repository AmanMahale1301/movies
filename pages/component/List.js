import { axiosOpen } from "@/utils/service";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import spinner from "../../assets/spinner.png";
import { useRouter } from "next/router";

const List = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosOpen.get(
          `/titles?titleType=${type}&limit=20`
        );
        console.log(response);
        setData(response?.data?.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(true);
      }
    };
    fetchData();
  }, []);
  const handleRoute = () => {
    const route = `/${encodeURIComponent(type)}`;
    router.push(route);
  };

  function formatType() {
    if (type === "movie") {
      return type + "s";
    } else if (type === "tvSeries") {
      return type.replace("tv", "tv ");
    }
  }
  const formattedType = formatType(type);
  return (
    <div className="mt-4">
      <span className="text-2xl text-white  font-bold capitalize mx-36">
        <FontAwesomeIcon icon={faTicket} color="white" className="me-2" />
        {formattedType}
      </span>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-2xl text-white me-2">Loading . . .</div>
          <Image
            src={spinner}
            className="animate-spin"
            width={40}
            height={40}
          />
        </div>
      ) : (
        <>
          <div className=" flex flex-wrap justify-center items-center ">
            {data && data.map((movie) => <Card data={movie} type={type} />)}
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              className="  p-2 bg-slate-100 text-lg rounded"
              onClick={() => handleRoute()}
            >
              View More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
