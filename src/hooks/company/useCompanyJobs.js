import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default (companyId) => {
  const [companyJobs, setCompanyJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/api/v1/profiles/6268f4795c8249342cd4ed22/jobs`)
      .then((result) => {
        setCompanyJobs(result.data.data);
        setErrorMessage(null);
        setLoading(false);
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        setErrorMessage(message);
        setLoading(false);
      });
  }, []);

  return [companyJobs, errorMessage, loading];
};
