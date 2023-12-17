import { axiosOpen } from "@/utils/service";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import placeholder from "../../assets/placeholder.jpg";
import user from "../../assets/user.jpg";

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
          const response = await axiosOpen.get(
            `/titles/${id}?info=custom_info`
          );
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

  const handleGenreClick = (genre) => {
    const route = `/genre/${encodeURIComponent(genre)}`;
    router.push(route);
  };
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
          <span className="text-yellow-400 font-sans xl:justify-start font-bold text-4xl mx-4 flex justify-center text-center  items-center">
            {data?.originalTitleText?.text}
          </span>
          <div className="flex justify-between my-2 mt-8 flex-wrap text-white">
            <div className=" px-6">
              {data?.primaryImage ? (
                <Image
                  src={data?.primaryImage?.url}
                  width={data?.primaryImage?.width}
                  height={data?.primaryImage?.height}
                  alt="test"
                  className="h-96 w-72 rounded "
                />
              ) : (
                <Image
                  src={placeholder}
                  width={200}
                  height={200}
                  alt="test"
                  className="h-96 w-72 rounded "
                />
              )}
            </div>
            <div className="flex-1 items-start mt-5 ms-6 ">
              {data?.ratingsSummary?.aggregateRating ? (
                <p className="text-lg mb-4">
                  {" "}
                  <span className=" font-semibold ">Ratings </span>:{" "}
                  {data?.ratingsSummary?.aggregateRating} / 10 (
                  {data?.ratingsSummary?.voteCount})
                </p>
              ) : (
                <p className="mb-4">
                  {" "}
                  <span className=" font-semibold ">Ratings </span>: No Ratings{" "}
                </p>
              )}
              <div className="mt-2">
                {data?.directors?.length > 0 ? (
                  <>
                    {data?.directors.map((director, index) => (
                      <div key={index} className="mb-4">
                        <div className="mt-2">
                          {director.credits.map((credit, creditIndex) => (
                            <div key={creditIndex}>
                              <div className="text-lg">
                                <span className="font-semibold ">Director</span>
                                : {credit.name.nameText.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-lg mb-4">
                    <span className="font-semibold">Director</span> : Not Found{" "}
                  </p>
                )}
              </div>
              <div className="mt-2">
                {data?.writers?.length > 0 ? (
                  <>
                    {data?.writers.map((writer, index) => (
                      <div key={index} className="mb-4">
                        <div className=" text-lg">
                          <span className="font-semibold">Writer: </span>
                          {writer.credits.map((credit, creditIndex) => (
                            <span key={creditIndex}>
                              {credit.name.nameText.text}
                              {creditIndex < writer.credits.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-lg mb-4">
                    <span className="font-semibold">Writer:</span> Not Found
                  </p>
                )}
              </div>
              <div className="mt-2">
                {data?.principalCast?.length > 0 ? (
                  <>
                    {data?.principalCast.map((actor, index) => (
                      <div key={index} className="mb-4">
                        <div className=" text-lg">
                          <div className="font-semibold">Actor: </div>
                          <div className="flex mt-2 items-center flex-wrap max-[492px]:justify-center">
                            {actor.credits.map((credit, creditIndex) => (
                              <div className="me-4 " key={creditIndex}>
                                <div className="flex justify-center w-full">
                                  {credit?.primaryImage ? (
                                    <Image
                                      src={credit?.primaryImage?.url}
                                      width={credit?.primaryImage?.width}
                                      height={credit?.primaryImage?.height}
                                      alt="test"
                                      className="h-20 w-20 rounded-full"
                                    />
                                  ) : (
                                    <Image
                                      src={user}
                                      width={200}
                                      height={200}
                                      alt="test"
                                      className="h-20 w-20 rounded-full"
                                    />
                                  )}
                                </div>
                                <div className="m-2 text-center">
                                  <div className="font-light">
                                    {credit.name.nameText.text}
                                  </div>
                                  {credit?.characters &&
                                    credit.characters.map(
                                      (character, index) => (
                                        <div
                                          key={character.__typename}
                                          className="underline underline-offset-4 font-extralight"
                                        >
                                          {character.name}
                                          {index <
                                            credit?.characters.length - 1 &&
                                            ", "}
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-lg mb-4">
                    <span className="font-semibold">Actor:</span> Not Found
                  </p>
                )}
              </div>
              <div className="mt-2">
                <div className="flex items-center text-lg">
                  <span className=" font-semibold pe-1">Genre </span> :
                  {data?.genres.genres.map((genre, index) => (
                    <div
                      key={genre.id}
                      onClick={() => handleGenreClick(genre.text)}
                      className="hover:underline px-1"
                    >
                      {console.log(data?.genres.genres.length)}
                      {genre.text}
                      {index < data?.genres.genres.length - 1 && ", "}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <div className="flex text-lg">
                  <span className="font-semibold pe-1 block">Plot</span>:
                  {data?.plot.plotText ? (
                    <div className="ps-1">{data?.plot.plotText.plainText}</div>
                  ) : (
                    <div>Not Found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
