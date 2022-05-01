import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  SimpleLineIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useContext } from "react";
import { api } from "../../../Constants";
import useCv from "../../hooks/client/useCv";
import useUserProfile from "../../hooks/client/useUserProfile";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;
const UserProfileScreen = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const state = useContext(UserContext);
  const [cv, error] = useCv(state.userId);
  const [userProfile] = useUserProfile(state.userId);

  if (error) {
    return (
      <Text style={{ color: "red", margin: 30 }}>Алдаа гарлаа! {error}</Text>
    );
  }
  if (!userProfile) {
    return null;
  }
  if (!cv) {
    return null;
  }
  return (
    <>
      <ScrollView>
        <Image
          source={{ uri: `${api}/upload/${userProfile.cover}` }}
          style={{ width: fullWidth, height: fullHeight / 4 }}
        />
        {/* Profile Pic and Name Follow Unfollow */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.background,
          }}
        >
          {/* Pro pic and Name category */}
          <View
            style={{
              flexDirection: "row",
              padding: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: `${api}/upload/${userProfile.profile}` }}
              style={{ width: 60, height: 60, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: colors.primaryText, fontWeight: "bold" }}>
                {userProfile.lastName} {userProfile.firstName}
              </Text>
              <Text style={{ color: colors.secondaryText }}>
                {userProfile.profession}
              </Text>
            </View>
          </View>
          {/* Follow unfollow */}
          <View style={{ padding: 30, alignItems: "center" }}>
            <SimpleLineIcons
              name="user-follow"
              size={24}
              color={colors.primaryText}
            />
            {/* <SimpleLineIcons name="user-unfollow" size={24} color="black" /> */}
            <Text style={{ color: colors.primaryText }}>Follow</Text>
          </View>
        </View>
        {/* Cv ilgeeh and contact */}

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "tomato",
              flex: 0.8,
              marginHorizontal: 5,
              paddingVertical: 8,
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate("CvCreateScreen", { data: cv })}
          >
            <View
              style={{ flexDirection: "row", alignSelf: "center" }}
              //
            >
              <FontAwesome name="send" size={24} color="black" />
              <Text style={{ textAlign: "center" }}>Cv үүсгэх</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "tomato",
              flex: 0.2,
              marginHorizontal: 5,
              paddingVertical: 8,
              borderRadius: 10,
            }}
          >
            <AntDesign
              name="contacts"
              size={24}
              color="black"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        {/* Follower Following Jobs */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.primaryText }}>
              {userProfile.postNumber}
            </Text>
            <Text style={{ color: colors.primaryText }}>Posts</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 1 }} />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.primaryText }}>
              {userProfile.follower}
            </Text>
            <Text style={{ color: colors.primaryText }}>Follower</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 1 }} />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.primaryText }}>
              {userProfile.following}
            </Text>
            <Text style={{ color: colors.primaryText }}>Following</Text>
          </TouchableOpacity>
        </View>
        {/* Line  */}

        <View style={{ padding: 3, backgroundColor: "grey" }} />

        {/* About */}
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: colors.primaryText, fontWeight: "bold" }}>
            Хэрэглэгчийн мэдээлэл
          </Text>
          {/* About */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            <MaterialCommunityIcons
              name="warehouse"
              size={20}
              color={colors.primaryText}
              style={{ width: "10%" }}
            />
            <Text
              style={{
                flexDirection: "row",
                width: "95%",
                color: colors.primaryText,
              }}
            >
              {userProfile.about}
            </Text>
          </View>
          {/* Website */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <MaterialCommunityIcons
              name="web"
              size={20}
              color={colors.primaryText}
              style={{ width: "10%" }}
            />
            <Text
              style={{
                flexDirection: "row",
                width: "95%",
                color: colors.primaryText,
              }}
            >
              {userProfile.location}
            </Text>
          </View>
        </View>
        {/* Experience */}
        {cv.experience > 0 && (
          <View>
            {cv.experience.map((e) => {
              return (
                <View>
                  <Text>experience</Text>
                </View>
              );
            })}
          </View>
        )}
        {/* Education */}
        {cv.course > 0 && (
          <View>
            {cv.course.map((e) => {
              return (
                <View>
                  <Text>course</Text>
                </View>
              );
            })}
          </View>
        )}
        {/* Line */}
        <View style={{ padding: 3, backgroundColor: "grey" }} />
        {/* Portfolia 1-3*/}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{ uri: `${api}/upload/${userProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
          <Image
            source={{ uri: `${api}/upload/${userProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
          <Image
            source={{ uri: `${api}/upload/${userProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
        </View>
        {/* Portfolia 3-6*/}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <Image
            source={{ uri: `${api}/upload/${userProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
          <Image
            source={{ uri: `${api}/upload/${userProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
          <Image
            source={{ uri: `${api}/upload/${userProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
        </View>
        {/* Line */}
        <View style={{ padding: 3, backgroundColor: "grey" }} />
        {/* Сүлжээнд нийтэлсэн постууд зарууд */}

        <View style={{ marginVertical: 50 }} />
      </ScrollView>
    </>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
