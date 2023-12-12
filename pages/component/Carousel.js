import { axiosOpen } from "@/utils/service";
import React, { useEffect, useState } from "react";
const Carousel = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const url =
          nextPageUrl ||
          `titles?titleType=movie&limit=10&list=top_boxoffice_last_weekend_10&page=${page}`;
        const response = await axiosOpen.get(url);

        setData((prevData) => [...prevData, ...response.data.results]);
        setNextPageUrl(response.data.next);
        console.log("Fetched data for page", page, response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.titleText.text}</li>
          ))}
        </ul>
      )}

      <button onClick={() => handleNextPage}>Next Page</button>
    </div>
  );
};

export default Carousel;
