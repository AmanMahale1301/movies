import { axiosOpen } from "@/utils/service";
import {
  faBars,
  faCalendar,
  faClose,
  faFilm,
  faFolderOpen,
  faGear,
  faGlobe,
  faHome,
  faSearch,
  faSign,
  faSignIn,
  faSignOut,
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
import { useSession, getProviders, signIn, signOut } from "next-auth/react";
import Preferences from "./Preferences";
import user from "../../assets/user.jpg";
const Nav = () => {
  const { data: session } = useSession();
  const [genres, setGenres] = useState([]);
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
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
    const setProvider = async () => {
      const response = await getProviders();
      const email = session?.user?.email;
      localStorage.setItem("userEmail", email);
      setProviders(response);
    };
    setProvider();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() !== "") {
        try {
          setLoading(true);
          const response = await axiosOpen.get(
            `/titles/search/keyword/${query}?info=base_info&sort=year.decr&endYear=2023&limit=3`
          );
          setSearchResults(response?.data?.results);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(fetchData, 1000);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSearchClick = () => {
    setShowSearch(true);
  };
  const handleSearchCancel = () => {
    setShowSearch(false);
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

  const handleSearch = () => {
    if (query.trim() !== "") {
      setQuery("");
      const route = `/search/${encodeURIComponent(query)}`;
      router.push(route);
    }
  };

  const handleMobileSearch = () => {
    const trimmedQuery = query.trim();
    console.log(trimmedQuery);
    if (query.trim() !== "") {
      setQuery("");
      const route = `/search/${encodeURIComponent(query)}`;
      router.push(route);
    }
  };
  const handleSearchRoute = (result) => {
    const route = `/${encodeURIComponent(
      result?.titleType?.id
    )}/${encodeURIComponent(result.id)}`;
    router.push(route);
  };
  const handleSignOut = async () => {
    setToggleDropdown(false);
    await signOut({ redirect: false });
    router.push("/");
  };
  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };
  return (
    <>
      <nav className="bg-[#0C141F] ">
        <div className="min-[772px]:flex hidden justify-around py-4 mx-2">
          {!showSearch && (
            <div className="container flex space-x-8 ">
              <Link href={"/"} className="navLink">
                <Image src={logo} width={150} height={60} alt="MovieStation" />
              </Link>
              <Link href={"/"} className="navLink">
                <FontAwesomeIcon icon={faHome} color="white" />
                <span className="navText">Home </span>
              </Link>
              <Link href={"/movies"} className="navLink">
                <FontAwesomeIcon icon={faFilm} color="white" />
                <span className="navText">Movies</span>
              </Link>
              <Link href={"/tvSeries"} className="navLink">
                <FontAwesomeIcon icon={faTv} color="white" />
                <span className="navText">TV Series</span>
              </Link>
              {session?.user ? (
                <>
                  <Link href={"/upcoming"} className="navLink">
                    <FontAwesomeIcon icon={faCalendar} color="white" />
                    <span className="navText">Upcoming</span>
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
                </>
              ) : null}
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
                    onClick={handleSearchCancel}
                    className="bg-white p-3 rounded-r me-1"
                  >
                    <FontAwesomeIcon icon={faClose} color="grey" size="xl" />
                  </button>
                  <ul className="absolute mt-5 bg-white w-2/5 z-50 right-1/2 translate-x-1/2 rounded ">
                    {loading ? (
                      <div className="p-4">Loading...</div>
                    ) : (
                      <>
                        {searchResults.length > 0 &&
                          searchResults.map((result) => (
                            <>
                              <div
                                className="searchItem"
                                onClick={() => handleSearchRoute(result)}
                              >
                                <div className="w-1/5">
                                  {result?.primaryImage ? (
                                    <Image
                                      src={result?.primaryImage?.url}
                                      width={result?.primaryImage?.width}
                                      height={result?.primaryImage?.height}
                                      alt="test"
                                      className="h-28 w-20"
                                    />
                                  ) : (
                                    <Image
                                      src={placeholder}
                                      width={200}
                                      height={200}
                                      alt="test"
                                      className="h-28 w-20"
                                    />
                                  )}
                                </div>
                                <div className="w-4/5">
                                  <span className="text-lg font-semibold py-1 ps-4  block">
                                    {result?.titleText.text}
                                  </span>
                                  {result?.ratingsSummary?.aggregateRating ? (
                                    <span className="text-medium font-semibold py-1  ps-4 block">
                                      {result?.ratingsSummary?.aggregateRating}{" "}
                                      / 10 ({result?.ratingsSummary?.voteCount})
                                    </span>
                                  ) : (
                                    <span className="text-medium font-semibold py-1  ps-4 block">
                                      No Reviews
                                    </span>
                                  )}

                                  <span className="text-base text-gray-600 italic font-light py-3  ps-4 block">
                                    {result?.releaseYear?.year}
                                  </span>
                                </div>
                              </div>

                              <hr className="border-t border-gray-400 mx-5" />
                            </>
                          ))}
                        {query !== "" && searchResults.length > 0 ? (
                          <button
                            className="p-3 mt-2 flex-center w-full hover:bg-black hover:bg-opacity-30 rounded-b"
                            onClick={() => handleSearch()}
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                              color="grey"
                              className="me-2"
                            />{" "}
                            <span className="text-lg font-medium ">
                              View All Results
                            </span>
                          </button>
                        ) : null}
                      </>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <button onClick={handleSearchClick}>
                  <FontAwesomeIcon icon={faSearch} color="white" />
                </button>
                <div className=" inline-block relative px-3">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      width={35}
                      height={35}
                      className="rounded-full"
                      onClick={toggleUserDropdown}
                      alt="profile"
                    />
                  ) : (
                    <Image
                      src={user}
                      height={35}
                      width={35}
                      className="rounded-full"
                      onClick={toggleUserDropdown}
                    />
                  )}

                  <ul
                    className={` absolute  text-gray-800 pt-2 right-1 z-20 top-[5.5vh] bg-zinc-100 ${
                      userDropdown ? "block" : "hidden"
                    } rounded `}
                  >
                    {session?.user ? (
                      <>
                        <li className="userItem">
                          <button onClick={handleSignOut} className="p-1">
                            <span className="text-lg font-semibold me-2 ">
                              Sign Out
                            </span>
                            <FontAwesomeIcon icon={faSignOut} color="black" />
                          </button>
                        </li>
                        <li className="userItem">
                          <button onClick={() => setOpen(true)} className="p-1">
                            <span className="text-lg font-semibold me-2 ">
                              Settings
                            </span>
                            <FontAwesomeIcon icon={faGear} color="black" />
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="userItem">
                          <button onClick={handleSignOut} className="">
                            {providers &&
                              Object.values(providers).map((provider) => (
                                <button
                                  type="button"
                                  key={provider.name}
                                  onClick={() => signIn(provider.id)}
                                  className="text-gray-900"
                                >
                                  <span className="text-lg font-semibold me-2 ">
                                    Sign In
                                  </span>
                                  <FontAwesomeIcon
                                    icon={faSignIn}
                                    color="black"
                                  />
                                </button>
                              ))}
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="min-[772px]:hidden flex relative w-full p-4">
          <div className="w-full">
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
                <Link href={"/movies"} className="navMobile">
                  <FontAwesomeIcon icon={faFilm} color="white" />
                  <span className="navText">Movies</span>
                </Link>
                <Link href={"/tvSeries"} className="navMobile">
                  <FontAwesomeIcon icon={faTv} color="white" />
                  <span className="navText">TV Series</span>
                </Link>
                {session?.user ? (
                  <>
                    <Link href={"/upcoming"} className="navMobile">
                      <FontAwesomeIcon icon={faCalendar} color="white" />
                      <span className="navText">Upcoming</span>
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
                    <Link href={"/preferences"} className="navMobile">
                      <FontAwesomeIcon icon={faGear} color="white" />
                      <span className="navText">Preferences</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="navMobile w-full"
                    >
                      <FontAwesomeIcon
                        icon={faSignOut}
                        color="white"
                        className="pl-3"
                      />
                      <span className="navText ">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    {providers &&
                      Object.values(providers).map((provider) => (
                        <button
                          type="button"
                          key={provider.name}
                          onClick={() => signIn(provider.id)}
                          className="navMobile w-full"
                        >
                          <FontAwesomeIcon
                            icon={faSignIn}
                            color="white"
                            className="pl-2"
                          />
                          <span className="navText">Sign In</span>
                        </button>
                      ))}
                  </>
                )}
                <div className="navMobile py-2">
                  <input
                    type="text"
                    className=" font-sans  rounded-r-none rounded text-center py-1  focus:border-none shadow appearance-none focus:outline-none "
                    placeholder="Search..."
                    style={{ width: "60vw" }}
                  />
                  <button
                    className="text-slate-200  bg-white py-1 px-2 rounded-r text-base font-sans  font-semibold "
                    onClick={() => handleMobileSearch()}
                  >
                    <FontAwesomeIcon icon={faSearch} color="grey" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Preferences
        isDrawerOpen={open}
        setIsDrawerOpen={setOpen}
        genres={genres}
        loading={loading}
      />
    </>
  );
};

export default Nav;
