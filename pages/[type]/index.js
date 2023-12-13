import { axiosOpen } from "@/utils/service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import spinner from "../../assets/spinner.png";
import Image from "next/image";
const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { type } = router.query;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type) {
          setLoading(true);
          const response = await axiosOpen.get(
            `/titles?titleType=${type}&limit=20&page=${currentPage}`
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
  }, [type, currentPage]);
  console.log(currentPage);
  console.log(data);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
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
    <>
      <span className="text-2xl text-white  font-bold capitalize flex justify-center items-center ">
        <FontAwesomeIcon icon={faTicket} color="white" className="me-2" />
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
          />
        </div>
      ) : (
        <>
          <div className=" flex flex-wrap justify-center items-center ">
            {data && data.map((movie) => <Card data={movie} type={type} />)}
          </div>
          <div className="w-full">
            <div className="flex justify-center py-4 ">
              <button
                className="p-3 px-4 text-white rounded bg-gradient-to-r from-[#0a153d] to-[#043b63] mx-2"
                disabled={currentPage === 1}
                onClick={() => handlePrevious()}
              >
                Previous
              </button>
              <span className="p-3 px-4 text-white rounded bg-gradient-to-r from-[#0a153d] to-[#043b63]">
                {currentPage}
              </span>
              <button
                className="p-3 px-4 text-white rounded bg-gradient-to-r from-[#0a153d] to-[#043b63] mx-2"
                disabled={data.length < 20} // Assuming you get 20 items per page
                onClick={() => handleNext()}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
