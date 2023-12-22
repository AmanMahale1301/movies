import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import spinner from "../../assets/spinner.png";
import Image from "next/image";
import axios from "axios";

const Preferences = ({ isDrawerOpen, setIsDrawerOpen, genres, loading }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [initialGenres, setInitialGenres] = useState([]);
  const { data: session } = useSession();

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
      setIsDrawerOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {isDrawerOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 fixed inset-0"></div>
          <div className="bg-gray-700 max-w-2xl max-h-full rounded shadow-2xl z-50">
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
                <div className="w-full flex justify-between px-10 pt-4 z-20">
                  <span className="w-full text-2xl font-semibold text-white">
                    Preference Setting
                  </span>
                  <span
                    className="text-2xl font-semibold text-gray-400 cursor-pointer"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    X
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
                          className="bg-gray-400 mx-2 p-2 text-white text-xs rounded-full"
                          key={selectedGenre}
                        >
                          {selectedGenre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap px-10">
                  {genres.map((genre) => (
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
                  ))}
                </div>

                {hasChanges && (
                  <div className="flex justify-end items-center py-2 mx-5">
                    <button
                      className="text-white border border-gray-400 bg-gray-800 p-1 px-3 rounded-md"
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
      )}
    </div>
  );
};

export default Preferences;
