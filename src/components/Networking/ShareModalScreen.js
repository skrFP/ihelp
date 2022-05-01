import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import MyTextInput from "../MyTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
const ShareModalScreen = (props) => {
  const { id } = props.route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [shareText, setShareText] = useState("Good morning!");
  const onShare = () => {
    axios
      .post(`${api}/api/v1/shares/${id}`, { body: shareText })
      .then((res) => {
        alert("Amjilttai sharellee");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text
        style={{ color: colors.primaryText, fontSize: 30 }}
        onPress={() => navigation.goBack()}
      >
        ShareModalScreen
      </Text>
      <MyTextInput onChangeText={setShareText} value={shareText} />
      <TouchableOpacity
        onPress={onShare}
        style={{
          alignSelf: "center",
          padding: 20,
          margin: 20,
          backgroundColor: colors.primary,
        }}
      >
        <Text> Хуваалцах </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareModalScreen;

const styles = StyleSheet.create({});
