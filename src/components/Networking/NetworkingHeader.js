import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const NetworkingHeader = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require("../../../assets/header.png")}
          />
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddPostScreen")}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("LikedPostScreen")}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NetworkingHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "black",
    paddingTop: 50,
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
