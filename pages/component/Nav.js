import { axiosOpen } from "@/utils/service";
import {
  faBars,
  faClose,
  faFilm,
  faFolderOpen,
  faGlobe,
  faHome,
  faSearch,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { useRouter } from "next/router";
import spinner from "../../assets/spinner.png";
import placeholder from "../../assets/placeholder.jpg";
const Nav = () => {
  const [genres, setGenres] = useState([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
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
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() !== "") {
        try {
          setLoading(true);
          const response = await axiosOpen.get(
            `/titles/search/keyword/${query}?limit=3&page=1`
          );
          setSearchResults(response?.data?.results);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } else {
        setSearchResults([]); // Clear results if the query is empty
      }
    };

    // Use a debounce function to delay API calls
    const debounceTimer = setTimeout(fetchData, 300);

    return () => clearTimeout(debounceTimer); // Cleanup on component unmount or when the query changes
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleMouseEnter = () => {
    setShowGenres(true);
  };

  const handleMouseLeave = () => {
    setShowGenres(false);
  };
  const handleRoute = (genre) => {
    const route = `/genre/${encodeURIComponent(genre)}`;
    router.push(route);
    setShowGenres(false);
  };

  return (
    <nav className="bg-[#0C141F] ">
      <div className="sm:flex hidden justify-around py-4 mx-2">
        {!showSearch && (
          <div className="container flex space-x-8 ">
            <Link href={"/"} className="navLink">
              <Image src={logo} width={150} height={60} alt="MovieStation" />
            </Link>
            <Link href={"/"} className="navLink">
              <FontAwesomeIcon icon={faHome} color="white" />
              <span className="navText">Home </span>
            </Link>
            <Link href={"/movie"} className="navLink">
              <FontAwesomeIcon icon={faFilm} color="white" />
              <span className="navText">Movies</span>
            </Link>
            <Link href={"/tvSeries"} className="navLink">
              <FontAwesomeIcon icon={faTv} color="white" />
              <span className="navText">TV Series</span>
            </Link>

            <div
              className={`relative inline-block text-left group mt-1.5 z-10`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <button
                  type="button"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  className="flex items-center gap-x-1.5 rounded-md text-gray-900 "
                >
                  <FontAwesomeIcon icon={faFolderOpen} color="white" />
                  <span className="navText">Genres</span>
                </button>
              </div>

              <ul
                className={`absolute text-gray-700 py-5 right-2/3 translate-x-1/2 ${
                  showGenres ? "block" : "hidden"
                } bg-[#1b2635] z-10 rounded`}
              >
                {loading ? (
                  <div className="flex items-center justify-center h-full w-32 py-2 pb-6">
                    <Image
                      src={spinner}
                      className="animate-spin "
                      width={40}
                      height={40}
                      alt="Loading"
                    />
                  </div>
                ) : (
                  <div className="container grid grid-cols-3 gap-4 w-max py-2 rounded-md">
                    {genres &&
                      genres.map((genre, index) => (
                        <li
                          className="mx-3"
                          key={index}
                          onClick={() => {
                            handleRoute(genre);
                          }}
                        >
                          <a
                            className="bg-[#333131] text-white hover:bg-gray-400 p-1 block text-center rounded"
                            style={{ cursor: "pointer" }}
                          >
                            {genre}
                          </a>
                        </li>
                      ))}
                  </div>
                )}
              </ul>
            </div>
          </div>
        )}
        <div className="navLink ">
          {showSearch ? (
            <>
              <div>
                <input
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  className="p-3 text-black items-center text-center rounded-l bg-white "
                  style={{ width: "60vw" }}
                />
                <button
                  onClick={handleSearchClick}
                  className="bg-white p-3 rounded-r me-1"
                >
                  <FontAwesomeIcon icon={faClose} color="grey" size="xl" />
                </button>
                <ul className="absolute mt-5 bg-white w-2/5 z-10 right-1/2 translate-x-1/2 rounded ">
                  {loading ? (
                    <div className="p-4">Loading...</div>
                  ) : (
                    <c>
                      {searchResults.length > 0 &&
                        searchResults.map((result) => (
                          <div className="p-2 border border-gray-800">
                            {result?.primaryImage ? (
                              <Image
                                src={result?.primaryImage?.url}
                                width={result?.primaryImage?.width}
                                height={result?.primaryImage?.height}
                                alt="test"
                                className="h-24 w-16"
                              />
                            ) : (
                              <Image
                                src={placeholder}
                                width={200}
                                height={200}
                                alt="test"
                                className="h-96 w-72"
                              />
                            )}
                          </div>
                        ))}
                    </c>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <button onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faSearch} color="white" />
            </button>
          )}
        </div>
      </div>
      <div className="sm:hidden flex relative w-full">
        <div className="w-full">
          {/* <Image
            src=""
             */}
          {/* /> */}
          <FontAwesomeIcon
            icon={faBars}
            color="white"
            size="xl"
            className="rounded-full"
            alt="profile"
            onClick={() => setToggleDropdown((prev) => !prev)}
          />
          {toggleDropdown && (
            <div className="container ">
              <Link href={"/"} className="navMobile">
                <FontAwesomeIcon icon={faHome} color="white" />
                <span className="navText">Home </span>
              </Link>
              <Link href={"/movie"} className="navMobile">
                <FontAwesomeIcon icon={faFilm} color="white" />
                <span className="navText">Movies</span>
              </Link>
              <Link href={"#"} className="navMobile">
                <FontAwesomeIcon icon={faTv} color="white" />
                <span className="navText">TV Series</span>
              </Link>
              <div
                className={`relative inline-block text-left group mt-1.5  w-full`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="navMobile">
                  <button
                    type="button"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    className="flex items-center gap-x-1.5 rounded-md text-gray-900"
                  >
                    <FontAwesomeIcon icon={faFolderOpen} color="white" />
                    <span className="navText">Genres</span>
                  </button>
                </div>

                <ul
                  className={`text-gray-700 py-5 mt-5  ${
                    showGenres ? "block" : "hidden"
                  }  z-10 rounded`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center h-full  py-2 pb-6 w-full">
                      <Image
                        src={spinner}
                        className="animate-spin "
                        width={40}
                        height={40}
                        alt="Loading"
                      />
                    </div>
                  ) : (
                    <div className=" grid grid-cols-3  gap-4 py-2 rounded-md w-full">
                      <>
                        {genres &&
                          genres.map((genre, index) => (
                            <li
                              className="mx-3 w-18"
                              key={index}
                              onClick={() => {
                                handleRoute(genre);
                              }}
                            >
                              <a
                                className="bg-[#333131] text-white   hover:bg-gray-400 p-1 block text-center rounded"
                                style={{ cursor: "pointer" }}
                              >
                                {genre}
                              </a>
                            </li>
                          ))}
                      </>
                    </div>
                  )}
                </ul>
              </div>
              <div className="navMobile py-2">
                <input
                  type="text"
                  className=" font-sans  rounded-r-none rounded text-center py-1  focus:border-none shadow appearance-none focus:outline-none "
                  placeholder="Search..."
                  style={{ width: "60vw" }}
                />
                <button
                  className="text-slate-200  bg-white py-1 px-2 rounded-r text-base font-sans  font-semibold "
                  onClick={() => handleSearchClick()}
                >
                  <FontAwesomeIcon icon={faSearch} color="grey" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
