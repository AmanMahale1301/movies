import Image from "next/image";
import React, { useState } from "react";
import placeholder from "../../assets/placeholder.jpg";
import Link from "next/link";
import { useRouter } from "next/router";

const Card = ({ data, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = async (id) => {
    const route = `/${encodeURIComponent(type)}/${encodeURIComponent(id)}`;
    console.log(route);
    router.push(route);
  };
  // console.log(data);
  return (
    <div className="relative max-w-sm rounded overflow-hidden  " key={data._id}>
      <div
        className="group relative px-4 py-4 transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-center items-center relative">
          {data?.primaryImage ? (
            <Image
              src={data?.primaryImage?.url}
              width={data?.primaryImage?.width}
              height={data?.primaryImage?.height}
              alt="test"
              className="h-96 w-72"
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
          {isHovered && (
            <div className="absolute inset-0 bg-black opacity-30 transition-all duration-300 group-hover:opacity-40"></div>
          )}
          {isHovered && (
            <button
              className="absolute inset-0 flex items-center justify-center text-white transform scale-110 group-hover:scale-125 transition-all duration-300"
              onClick={() => handleCardClick(data?.id)}
            >
              <Link className="video-play-button" href={"/"}>
                <span></span>
              </Link>
            </button>
          )}
        </div>
        <div className="font-sans text-white text-xs mt-1">
          {data.originalTitleText.text}
        </div>
        <div className="font-sans text-slate-400 text-xs mt-1">
          {data.releaseYear.year}
        </div>
      </div>
    </div>
  );
};

export default Card;
