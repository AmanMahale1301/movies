import { axiosOpen } from "@/utils/service";
import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import Image from "next/image";
import spinner from "../../assets/spinner.png";
import { useRouter } from "next/router";

const Search = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPageVal, setNewPageVal] = useState(currentPage);
  const router = useRouter();
  const { query } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          setLoading(true);
          const response = await axiosOpen.get(
            `/titles/search/keyword/${query}?info=base_info&limit=20&page=${currentPage}`
          );
          console.log(response);
          setData(response?.data?.results);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(true);
      }
    };
    fetchData();
  }, [query, currentPage]);

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

  return (
    <div className="mt-4">
      <span className="text-4xl text-white flex justify-center items-center  font-bold capitalize ">
        Search Results for "{query}"
      </span>
      {loading ? (
        <div className="flex items-center justify-center h-full">
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
          {data ? (
            <>
              <div className=" flex flex-wrap justify-center items-center ">
                {data.map((item) => (
                  <Card data={item} type={item?.titleType?.text} />
                ))}
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
                  <input
                    className="p-3 w-20 text-white items-center text-center rounded bg-gradient-to-r from-[#0a153d] to-[#043b63]"
                    value={newPageVal}
                    onChange={(event) => setNewPageVal(event.target.value)}
                    onKeyDown={handlePage}
                  />

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
          ) : (
            <div className="flex justify-center items-center my-4 text-3xl font-semibold text-gray-400">
              No records found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
