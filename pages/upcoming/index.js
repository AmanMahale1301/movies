import { axiosOpen } from "@/utils/service";
import { useState, useEffect } from "react";
import Card from "../component/Card";
import Image from "next/image";
import spinner from "../../assets/spinner.png";

const fetchMoreData = async (page) => {
  const response = await axiosOpen.get(
    `/titles/x/upcoming?page=${page}&info=custom_info&limit=20`
  );
  const newData = await response?.data?.results;

  return newData;
};

const Index = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleFetchMore = async () => {
    setLoading(true);
    const newData = await fetchMoreData(page + 1);
    setData([...data, ...newData]);
    setPage(page + 1);
    setLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      !loading &&
      data.length < 100
    ) {
      handleFetchMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, data, page]);

  return (
    <div>
      <span className="text-3xl font-bold py-5 text-white flex-center">
        Upcoming Titles
      </span>
      <div className="flex flex-wrap justify-center items-center">
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
      {loading && data.length <= 100 && (
        <div className="text-white flex-center my-4">
          <Image
            src={spinner}
            width={100}
            height={100}
            alt="Loading"
            className="animate-spin"
          />
        </div>
      )}
      {data.length >= 100 ? (
        <div className="flex-center my-4">
          {loading ? (
            <Image
              src={spinner}
              width={100}
              height={100}
              alt="Loading"
              className="animate-spin"
            />
          ) : (
            <span
              onClick={handleFetchMore}
              className=" text-white font-semibold text-lg border border-gray-300 p-2 rounded "
              style={{ cursor: "pointer" }}
            >
              Load More
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};

export async function getStaticProps() {
  const page = 1;
  const initialData = await fetchMoreData(page);

  return {
    props: {
      initialData,
    },
    revalidate: 60,
  };
}

export default Index;
