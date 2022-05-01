import { useState, useEffect } from "react";
import axios from "axios";

import { api } from "../../../Constants";

export default (companyId) => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const loadCompanyProfile = async () => {
    try {
      const result = await axios.get(
        `${api}/api/v1/profiles/6268f4795c8249342cd4ed22`
      );
      //   console.log(result.data.data);
      setCompanyProfile(result.data.data);
    } catch (err) {
      let message = err.message;
      if (message === "Request failed with status code 404") {
        message = "Уучлаарай сэрвэр дахин ажилуулана уу";
      } else if (message === "Network Error") {
        message =
          "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
      }
    }
  };

  useEffect(() => {
    loadCompanyProfile();
  }, []);

  return [companyProfile];
};
