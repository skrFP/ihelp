import { StyleSheet, View, TextInput } from "react-native";
import React from "react";

const MyTextInput = (props) => {
  return (
    <View>
      <TextInput
        style={[styles.inputField, props.style]}
        {...props}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    // color: "grey",
  },
});
