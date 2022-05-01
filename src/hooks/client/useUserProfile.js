import { useState, useEffect } from "react";
import axios from "axios";

import { api } from "../../../Constants";

export default (userId) => {
  const [userProfile, setUserProfile] = useState(null);
  const loadUserProfile = async () => {
    try {
      const result = await axios.get(`${api}/api/v1/cvs/${userId}`);
      setUserProfile(result.data.data);
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
    loadUserProfile();
  }, []);

  return [userProfile];
};
