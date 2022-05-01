import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../../components/MyTextInput";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const [phone, setPhone] = useState("97014400");
  const [password, setPassword] = useState("123456");
  const signUpHandler = () => {
    state.login(phone, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ top: 10, flex: 1 }}>
          <View>
            <Text style={styles.inputHeadText}>Утасны дугаар:</Text>
            <MyTextInput value={phone} onChangeText={setPhone} />

            <Text style={styles.inputHeadText}>Нууц үг:</Text>
            <MyTextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, top: 5 }}
              onPress={signUpHandler}
            >
              <ImageBackground
                source={require("../../../assets/splash.png")}
                style={{ height: 100 }}
              >
                <Text
                  style={{
                    top: 45,
                    fontSize: 18,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Нэвтрэх
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                position: "absolute",
                top: 100,
                alignSelf: "center",
              }}
            >
              Бүртгүүлэх бол{" "}
              <Text
                style={{ color: "#765097" }}
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                энд дар
              </Text>{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#765097",
    fontWeight: "600",
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
    color: "grey",
    fontWeight: "bold",
  },
});
