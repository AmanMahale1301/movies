import { axiosOpen } from "@/utils/service";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Index = () => {
  const { data: session } = useSession();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}/user/preferences`,
          {
            email: session?.user?.email,
          }
        );
        console.log(response);
        setSelectedGenres(response.data.preferences);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPreferences();
  }, [session]);
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
  useEffect(() => {
    const fetchData = async () => {
      const requests = selectedGenres.map(async (genre) => {
        const response = await axiosOpen.get(
          `/titles?list=titles&genre=${genre}`
        );
        return response.data.results;
      });
      const resultsArrays = await Promise.all(requests);

      const mergedArray = mergeKeyResults(resultsArrays, "id");

      setData(mergedArray);
    };
    fetchData();
  }, []);
  console.log(data);
  return <div>Index</div>;
};

export default Index;
