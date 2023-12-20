// import { axiosOpen } from "@/utils/service";
// import React, { useEffect, useState } from "react";
// const Carousel = () => {
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [nextPageUrl, setNextPageUrl] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const url =
//           nextPageUrl ||
//           `titles?titleType=movie&limit=10&list=top_boxoffice_last_weekend_10&page=${page}`;
//         const response = await axiosOpen.get(url);

//         setData((prevData) => [...prevData, ...response.data.results]);
//         setNextPageUrl(response.data.next);
//         console.log("Fetched data for page", page, response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [page]);

//   const handleNextPage = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {data.map((item) => (
//             <li key={item.id}>{item.titleText.text}</li>
//           ))}
//         </ul>
//       )}

//       <button onClick={() => handleNextPage}>Next Page</button>
//     </div>
//   );
// };

// export default Carousel;

import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages] = useState(2); // Change this if you have more pages
  const itemsPerPage = 1; // Each carousel item occupies one page

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the page to show the next set of slides
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentPage, totalPages]);

  function showSlide(pageIndex) {
    const transformValue = `translateX(-${pageIndex * 100}%)`;
    return {
      transform: transformValue,
      display: "flex",
    };
  }

  function handleChangePage(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <h1>index</h1>
    // <div className="max-w-3xl mx-auto relative">
    //   <div className="carousel">
    //     <div className="carousel-inner" style={showSlide(currentPage)}>
    //       {[...Array(totalPages)].map((_, index) => (
    //         <div className="carousel-item" key={index}>
    //           <div className="bg-white p-4 shadow-md mb-4">{`Item ${
    //             index + 1
    //           }`}</div>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Previous and Next buttons */}
    //     <button
    //       className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
    //       onClick={() =>
    //         handleChangePage((currentPage - 1 + totalPages) % totalPages)
    //       }
    //     >
    //       Previous
    //     </button>
    //     <button
    //       className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
    //       onClick={() => handleChangePage((currentPage + 1) % totalPages)}
    //     >
    //       Next
    //     </button>
    //   </div>

    //   {/* Page indicators */}
    //   <div className="mt-4 text-center">
    //     {[...Array(totalPages)].map((_, index) => (
    //       <button
    //         key={index}
    //         onClick={() => handleChangePage(index)}
    //         className={`mx-2 p-2 ${
    //           index === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
    //         }`}
    //       >
    //         {index + 1}
    //       </button>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Carousel;
