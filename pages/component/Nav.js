import { axiosOpen } from "@/utils/service";
import {
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
const Nav = () => {
  const [genres, setGenres] = useState([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosOpen.get("titles/utils/genres");
        const data = response?.data?.results;
        const filteredData = data.filter((value) => value !== null);
        setGenres(filteredData);
        setDataFetched(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(genres);
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
          <Link href={"#"} className="navLink">
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
        <div className="navLink me-5">
          <button>
            <FontAwesomeIcon icon={faSearch} color="white" />
          </button>
        </div>
      </div>
      <div className="sm:hidden flex relative">
        <div className="flex">
          <Image
            src=""
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            onClick={() => setToggleDropdown((prev) => !prev)}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/products"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                All Products
              </Link>
              <button
                type="button"
                // onClick={handleSignOut}
                className="mt-5 w-full black_btn"
              >
                Sign Out
              </button>

              {/* <button onClick={() => setOpen(true)}>
                <Image src="" width={35} height={35} alt="Cart" />
              </button> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
