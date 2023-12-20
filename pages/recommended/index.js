import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Index = () => {
  const { data: session } = useSession();
  const [selectedGenres, setSelectedGenres] = useState([]);

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
        console.error(error);
      }
    };
    fetchPreferences();
  }, [session]);

  return <div>Index</div>;
};

export default Index;
