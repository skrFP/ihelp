import { useState, useEffect } from "react";
import axios from "axios";

import { api } from "../../../Constants";

export default (cvId) => {
  const [cv, setCv] = useState(null);
  const [error, setError] = useState(null);

  const loadCv = async () => {
    try {
      const result = await axios.get(`${api}/api/v1/questionnaires/${cvId}`);
      //   console.log(result.data.data);
      setCv(result.data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadCv();
  }, []);

  return [cv, error];
};
