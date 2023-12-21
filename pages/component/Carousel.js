import React, { useState, useEffect } from "react";
import CarouselCard from "./CarouselCard";
import { useSession } from "next-auth/react";
import { axiosOpen } from "@/utils/service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import spinner from "../../assets/spinner.png";
import Image from "next/image";
import axios from "axios";

const Carousel = () => {
  const { data: session } = useSession();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dataFetched, setDataFetched] = useState(false);
  const mergeKeyResults = (arrays, key) => {
    const merged = arrays.reduce((accumulator, array) => {
      array.forEach((item) => {
        const isDuplicate = accumulator.some(
          (mergedItem) => mergedItem[key] === item[key]
        );

        if (!isDuplicate) {
          accumulator.push(item);
        }
      });

      return accumulator;
    }, []);

    return merged;
  };
  const getRandomResults = (mergedArray, numberOfResults) => {
    if (mergedArray.length <= numberOfResults) {
      return mergedArray;
    }

    const shuffledArray = [...mergedArray].sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numberOfResults);
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.post(`/api/user/preferences`, {
          email: session?.user?.email,
        });
        setSelectedGenres(response.data.preferences);

        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    if (!dataFetched) {
      fetchPreferences();
    }
  }, [session, dataFetched]);

  useEffect(() => {
    if (dataFetched) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const requests = selectedGenres.map(async (genre) => {
            const response = await axiosOpen.get(
              `/titles?list=titles&genre=${genre}`
            );
            return response.data.results;
          });
          const resultsArrays = await Promise.all(requests);

          const mergedArray = mergeKeyResults(resultsArrays, "id");
          const randomResults = getRandomResults(mergedArray, 20);
          setCardData(randomResults);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [selectedGenres, dataFetched]);
  console.log(cardData);
  const totalSlides = cardData.length / 4 || 5 / 4;
  const cardsPerSlide = 4;
  const startIndex = (currentSlide - 1) * cardsPerSlide;
  const endIndex = startIndex + cardsPerSlide;

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 1 ? totalSlides : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides ? 1 : prevSlide + 1
    );
  };
  const handleSlideChange = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === totalSlides ? 1 : prevSlide + 1
      );
    }, 5000); // Change the interval time as needed (currently set to 5 seconds)

    return () => clearInterval(interval);
  }, [currentSlide, totalSlides]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl text-white me-2">Loading . . .</div>
          <Image
            src={spinner}
            className="animate-spin"
            width={40}
            height={40}
            alt="Loading"
          />
        </div>
      ) : (
        <div className="relative">
          <div className="flex justify-around mx-10 text-white items-center">
            <button
              onClick={handlePrevSlide}
              className="border-2 border-gray-300 p-2 rounded"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} color="white" />
            </button>
            <div className="flex justify-center flex-wrap">
              {cardData.slice(startIndex, endIndex).map((data) => (
                <CarouselCard key={data._id} data={data} />
              ))}
            </div>
            <button
              onClick={handleNextSlide}
              className="border-2 border-gray-300 p-2 rounded"
            >
              <FontAwesomeIcon icon={faArrowRightLong} color="white" />
            </button>
          </div>
          <div className="carousel-tabs">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handleSlideChange(index + 1)}
                className={`bg-[#020916] border border-gray-300  text-xs font-medium px-1  rounded mx-2 ${
                  currentSlide === index + 1
                    ? "bg-slate-100 text-slate-100"
                    : "text-[#020916]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
