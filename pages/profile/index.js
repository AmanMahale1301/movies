import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import spinner from "../../assets/spinner.png";
import user from "../../assets/user.jpg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { axiosOpen } from "@/utils/service";

const index = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [initialGenres, setInitialGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosOpen.get("titles/utils/genres");
        const data = response?.data?.results;
        const filteredData = data.filter((value) => value !== null);
        setGenres(filteredData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(session);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          setLoading(true);
          console.log("data");
          const response = await axios.post(`/api/user/preferences`, {
            email: session?.user?.email,
          });

          setInitialGenres(response?.data?.preferences);
          setSelectedGenres(response?.data?.preferences);
          toast.success(response.data.message);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
        toast.error("Error fetching preferences");

        setLoading(false);
      }
    };

    fetchData();
  }, [session]);
  console.log(selectedGenres);

  const toggleGenreSelection = (genre) => {
    const isGenreSelected = selectedGenres.includes(genre);
    const isLimitReached = selectedGenres.length >= 5;

    if (!isLimitReached || isGenreSelected) {
      setSelectedGenres((prevSelectedGenres) =>
        isGenreSelected
          ? prevSelectedGenres.filter(
              (selectedGenre) => selectedGenre !== genre
            )
          : [...prevSelectedGenres, genre]
      );
    } else {
      toast.error("Upto 5 Genres can be selected");
    }
  };

  const hasChanges =
    JSON.stringify(selectedGenres) !== JSON.stringify(initialGenres);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`/api/user/updatePreferences`, {
        userPreferences: selectedGenres,
        email: session.user.email,
      });

      setInitialGenres(selectedGenres);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className=" max-w-2xl max-h-full rounded  ">
        {loading ? (
          <div className="flex items-center justify-center h-full w-32 py-2 pb-6">
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
            <div className="w-full flex justify-start px-10 pt-4 ">
              <span className="w-full text-2xl font-semibold text-white">
                User Information
              </span>
            </div>
            {session?.user ? (
              <>
                <div className="w-full flex-center my-3">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      width={150}
                      height={150}
                      alt="Profile"
                      className="rounded-full"
                    />
                  ) : (
                    <Image src={user} width={150} height={150} alt="Profile" />
                  )}
                </div>
                <div className="w-full flex justify-start px-10 pt-4 ">
                  <span className=" font-semibold text-white">
                    Full Name :{" "}
                  </span>
                  <span className="font-regular ms-1 text-white">
                    {" "}
                    {session?.user?.name}
                  </span>
                </div>
                <div className="w-full flex justify-start px-10 pt-4 ">
                  <span className="font-semibold text-white">Email : </span>
                  <span className="font-regular ms-1 text-white">
                    {" "}
                    {session?.user?.email}
                  </span>
                </div>
              </>
            ) : (
              <span className="w-full text-2xl font-semibold text-white">
                Not Found
              </span>
            )}
            <div className="w-full flex justify-start px-10 pt-4 ">
              <span className="w-full text-2xl font-semibold text-white">
                Preferences
              </span>
            </div>
            <div className="px-10">
              <span className="text-xs text-gray-300 font-sans font-light italic w-full">
                (Select upto 5 preferred Genres)
              </span>
            </div>
            {selectedGenres.length > 0 && (
              <div className="px-10 my-4">
                <div className="flex flex-wrap">
                  {selectedGenres.map((selectedGenre) => (
                    <span
                      className="bg-gray-400 m-2 p-2 text-white text-xs rounded-full"
                      key={selectedGenre}
                    >
                      {selectedGenre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap px-10">
              {loading ? (
                <div className="flex items-center justify-center h-full w-32 py-2 pb-6">
                  <Image
                    src={spinner}
                    className="animate-spin"
                    width={40}
                    height={40}
                    alt="Loading"
                  />
                </div>
              ) : (
                genres.map((genre) => (
                  <span
                    key={genre}
                    className={`m-2 p-2 rounded cursor-pointer ${
                      selectedGenres.includes(genre)
                        ? "bg-white"
                        : "bg-gray-600 text-white"
                    }`}
                    onClick={() => toggleGenreSelection(genre)}
                  >
                    {genre}
                  </span>
                ))
              )}
            </div>

            {hasChanges && (
              <div className="flex justify-end items-center py-2 mx-5">
                <button
                  className="text-white border border-gray-400 p-1 px-3 rounded-md"
                  onClick={() => handleSubmit()}
                >
                  Save
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default index;
