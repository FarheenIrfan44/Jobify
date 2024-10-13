import { useState, useEffect } from "react";
import axios from "axios";
import { RPID_API_KEY } from "@env";

const rapidApiKey = RPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const options1 = {
    method: "GET",
    hostname: "jsearch.p.rapidapi.com",
    port: null,
    path: "/estimated-salary?job_title=NodeJS%20Developer&location=New-York%2C%20NY%2C%20USA&radius=100",
    headers: {
      "x-rapidapi-key": "f11e434301mshed1c8c8c2912cc7p1bc3bdjsn2c9f6f489ae7",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      alert('There is an error')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
