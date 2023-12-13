import { axiosOpen } from "@/utils/service";
import {
  faBars,
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
const Nav = () => {
  const [genres, setGenres] = useState([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showGenres, setShowGenres] = useState(false);

  const [loading, setLoading] = useState(false);
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
      <div className="sm:flex hidden justify-between py-4 mx-2">
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
          <Link href={"#"} className="navLink">
            <FontAwesomeIcon icon={faTv} color="white" />
            <span className="navText">TV Series</span>
          </Link>
          <div
            className={`relative inline-block text-left group mt-1.5 z-10 `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div>
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
              className={`absolute text-gray-700 pt-5 ${
                showGenres ? "block" : "hidden"
              } bg-slate-500 z-10 rounded`}
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
                          className="bg-gray-200 hover:bg-gray-400 p-1 block text-center rounded"
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
          <Link href={"#"} className="navLink">
            <FontAwesomeIcon icon={faGlobe} color="white" />
            <span className="navText">Countries</span>
          </Link>
        </div>
        <div className="navLink me-5">
          <button>
            <FontAwesomeIcon icon={faSearch} color="white" />
          </button>
        </div>
      </div>
      <div className="sm:hidden flex relative">
        <div className="">
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
            // <div className="dropdown">
            //   <Link
            //     href="/products"
            //     className="dropdown_link"
            //     onClick={() => setToggleDropdown(false)}
            //   >
            //     All Products
            //   </Link>
            //   <button
            //     type="button"
            //     // onClick={handleSignOut}
            //     className="mt-5 w-full black_btn"
            //   >
            //     Sign Out
            //   </button>

            //   {/* <button onClick={() => setOpen(true)}>
            //     <Image src="" width={35} height={35} alt="Cart" />
            //   </button> */}
            // </div>
            <div className="container ">
              <Link href={"/"} className="navLink">
                <FontAwesomeIcon icon={faHome} color="white" />
                <span className="navText">Home </span>
              </Link>
              <Link href={"/movie"} className="navLink">
                <FontAwesomeIcon icon={faFilm} color="white" />
                <span className="navText">Movies</span>
              </Link>
              <Link href={"#"} className="navLink">
                <FontAwesomeIcon icon={faTv} color="white" />
                <span className="navText">TV Series</span>
              </Link>
              <div className="relative inline-block text-left group mt-1.5">
                <div>
                  <button
                    type="button"
                    // className="inline-flex w-full justify-center gap-x-1.5 rounded-md   text-gray-900 "

                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    <FontAwesomeIcon icon={faFolderOpen} color="white" />
                    <span className="navText">Genres</span>
                  </button>
                </div>

                <ul className="absolute hidden text-gray-700 pt-5 group-hover:block">
                  <div className="container bg-slate-500 grid grid-cols-3 gap-4 w-max py-2 rounded-md">
                    {genres &&
                      genres.map((genre, index) => (
                        <li className="mx-3" key={index}>
                          <a className="bg-gray-200 hover:bg-gray-400 p-1 block text-center rounded">
                            {genre}
                          </a>
                        </li>
                      ))}
                  </div>
                </ul>
              </div>
              <Link href={"#"} className="navLink">
                <FontAwesomeIcon icon={faGlobe} color="white" />
                <span className="navText">Countries</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
