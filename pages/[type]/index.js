import { axiosOpen } from "@/utils/service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import spinner from "../../assets/spinner.png";
import Image from "next/image";
const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let { type } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("year.decr");
  const [newPageVal, setNewPageVal] = useState(currentPage);
  const date = new Date();
  const year = date.getFullYear();
  if (type === "movies") {
    const formatType = type.replace("s", "");
    console.log(formatType);
    type = formatType;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type) {
          setLoading(true);

          const response = await axiosOpen.get(
            `/titles?titleType=${type}&sort=${sort}&endYear=${year}&limit=20&page=${currentPage}`
          );
          setData(response?.data?.results);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [type, currentPage, sort]);
  console.log(currentPage);
  console.log(data);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    setNewPageVal(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    setNewPageVal(currentPage - 1);
  };
  const handlePage = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(parseInt(newPageVal));
    }
  };
  function formatType() {
    if (type === "movie") {
      return type + "s";
    } else if (type === "tvSeries") {
      return type.replace("tv", "tv ");
    }
  }
  const formattedType = formatType(type);
  const handleSort = (item) => {
    console.log(item);
    setSort(item);
  };
  return (
    <>
      <span className="text-4xl text-white my-5 font-bold capitalize flex justify-center items-center ">
        {formattedType}
      </span>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl text-white me-2">Loading . . .</div>
          <Image
            src={spinner}
            className="animate-spin"
            width={40}
            height={40}
            alt="Loading"
          />
        </div>
      ) : (
        <>
          <div className="flex justify-end items-center me-4 max-[492px]:w-full ">
            <select
              id="sortOptions"
              name="sortOptions"
              className="mt-1 block w-40 py-2 px-3 border border-gray-300 bg-[#020916] text-white rounded-md focus:outline-none max-[492px]:w-full mx-10"
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="year.incr" className="py-1">
                Ascending
              </option>
              <option value="year.decr" className="py-1">
                Descending
              </option>
            </select>
          </div>

          <div className=" flex flex-wrap justify-center items-center ">
            {data && data.map((movie) => <Card data={movie} type={type} />)}
          </div>
          <div className="w-full">
            <div className="flex justify-center py-4 ">
              <button
                className={`p-3 px-4 text-white border-2 ${
                  currentPage === 1 ? "border-[#3f3e3e]" : "border-gray-400"
                } border-gray-400  text-center rounded-lg bg-[#020916] mx-2`}
                disabled={currentPage === 1}
                onClick={() => handlePrevious()}
              >
                <FontAwesomeIcon icon={faArrowLeft} color="white" />
              </button>
              <input
                className=" w-10 items-center text-white border-2 border-gray-400 text-center rounded-lg bg-[#020916]"
                value={newPageVal}
                disabled={data.length < 20}
                onChange={(event) => setNewPageVal(event.target.value)}
                onKeyDown={handlePage}
              />
              <button
                className={`p-3 px-4 text-white border-2 ${
                  data.length < 20 ? "border-[#3f3e3e]" : "border-gray-400"
                } text-center rounded-lg bg-[#020916] mx-2`}
                disabled={data.length < 20}
                onClick={() => handleNext()}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  color={`${data.length < 20 ? "#2f2a2a" : "white"}`}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
