import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../../Constants";
import { Alert, Platform } from "react-native";
import { useState, createContext, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
const UserContext = createContext();
export const UserStore = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userId, setUserId] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content);
      });
    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await axios.get(`${api}/api/v1/cvs/logout`);
    setIsLoggedIn(false);
    setIsCompany(false);
    setToken(null);
    setEmail(null);
    setPhone(null);
    setUserId(null);
    setExpoPushToken(null);
  };

  const login = (phone, password) => {
    axios
      .post(`${api}/api/v1/cvs/login`, {
        phone: phone,
        password: password,
        expoPushToken: expoPushToken,
      })
      .then((res) => {
        // console.log(res.data.cv);
        loginUserSuccessFul(
          res.data.token,
          res.data.cv.email,
          phone,
          res.data.cv._id,
          res.data.cv.organization
        );
      })
      .catch((err) => {
        loginFailed(err.message);
        let message = err.message;
        Alert.alert(message);
      });
  };

  const signUp = (phone, email, password, firstName, lastName, random) => {
    axios
      .post(`${api}/api/v1/cvs`, {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,
        role: "user",
        random: random,
        expoPushToken: expoPushToken,
      })
      .then((res) => {
        loginUserSuccessFul(
          res.data.token,
          email,
          phone,
          "user",
          res.data.data._id,
          res.data.data.organization
        );
      })
      .catch((err) => {
        loginFailed(err.message);
        Alert.alert(message);
      });
  };

  const loginFailed = (error) => {
    setIsLoggedIn(false);
    setIsCompany(false);
    setEmail(null);
    setPhone(null);
    setUserId(null);
  };
  const loginUserSuccessFul = async (
    token,
    email,
    phone,
    userId,
    isCompany
  ) => {
    setToken(token);
    setEmail(email);
    setPhone(phone);
    setUserId(userId);
    setIsCompany(isCompany);
    setIsLoggedIn(true);

    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ token, email, phone, userId, isCompany })
      );
    } catch (err) {
      console.log("Утас руу хадгалж чадсангүй");
    }
  };
  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        signUp,
        logout,
        token,
        setToken,
        isCompany,
        setIsCompany,
        email,
        setEmail,
        phone,
        setPhone,
        userId,
        setUserId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Та мэдэгдэл хүлээн авах тохиргоог зөвшөөрөөгүй байна");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for push notifications");
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}
