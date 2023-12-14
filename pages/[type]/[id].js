import { axiosOpen } from "@/utils/service";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import placeholder from "../../assets/placeholder.jpg";

const index = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const { id } = router.query;
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setLoading(true);
          const response = await axiosOpen.get(`/titles/${id}`);
          console.log(response);
          setData(response?.data?.results);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  console.log(data);
  return (
    <>
      {loading ? (
        <div className="mx-4 my-4">
          <div className=" shadow rounded-md p-4  w-full h-full ">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded bg-slate-700 h-96 w-72"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2 py-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1 py-2"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-10 mx-24">
          <span className="text-white font-sans font-bold text-4xl mx-4 flex justify-start items-center">
            {data?.originalTitleText?.text}
          </span>
          <div className="flex justify-between items-center my-2 mt-8 text-white">
            <div className="">
              {data?.primaryImage ? (
                <Image
                  src={data?.primaryImage?.url}
                  width={data?.primaryImage?.width}
                  height={data?.primaryImage?.height}
                  alt="test"
                  className="h-96 w-72 rounded mx-6"
                />
              ) : (
                <Image
                  src={placeholder}
                  width={200}
                  height={200}
                  alt="test"
                  className="h-96 w-72 rounded mx-6"
                />
              )}
            </div>
            <div className="">test</div>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
