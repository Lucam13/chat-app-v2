import { useState, useEffect } from "react";
import axios from "axios";

const useGetAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get("/api/areas");
        setAreas(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return { areas, loading, error };
};

export default useGetAreas;
