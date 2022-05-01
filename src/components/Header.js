import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";

const Header = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/f3f3f3/back.png",
            }}
            style={[styles.icon]}
          />
        </TouchableOpacity>
      </View>
      {/* <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        {" "}
        {props.work}{" "}
      </Text> */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("LikedPostScreen")}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/fff/like--v1.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "black",
    paddingTop: 50,
    paddingBottom: 10,
  },
  logo: { width: 100, height: 50, resizeMode: "contain" },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
  unreadBadge: {
    backgroundColor: "#ff3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});
