import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { api } from "../../../Constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import moment from "moment";
import "moment/locale/mn";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
const fullWidth = Dimensions.get("screen").width;
const Posts = (props) => {
  const {
    postId,
    createUser,
    body,
    photo,
    isShared,
    sharedUser,
    createdAt,
    sharedCreatedAt,
    sharedBody,
    sharedPhoto,
    likeCount,
    commentCount,
    shareCount,
    isLiked,
  } = props;
  // Like unlike func
  const [liked, setLiked] = useState(isLiked);
  const onLike = () => {
    if (liked) {
      setLiked(false);
      axios
        .delete(`${api}/api/v1/likes/${postId}`)
        .then((res) => {
          console.log(res.data.data);
          // alert("Unlike hiilee");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLiked(true);
      axios
        .post(`${api}/api/v1/likes/${postId}`)
        .then((res) => {
          // alert("Like darlaa");
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      {/* Shared user */}
      {isShared && (
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfileDetail", { id: createUser._id })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              // marginHorizontal: data.isShare ? 0 : 10,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Image
              source={{
                uri: `${api}/upload/${createUser.profile}`,
              }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
                {createUser.lastName} {createUser.firstName}{" "}
              </Text>
              <Text style={{ color: colors.secondaryText }}>
                {moment(createdAt).fromNow()}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={{ margin: 5, color: colors.primaryText }}> {body} </Text>
        </>
      )}
      {/* User Post */}
      <View style={{ marginTop: !isShared && 10 }}>
        {/* User detail and body and photos */}
        <View
          style={{
            marginHorizontal: isShared ? 20 : 0,
            borderWidth: isShared ? 0.3 : 0,
            borderColor: colors.border,
          }}
        >
          {/* isShared true false aaraa sharelesen zar uguin ylgaa garna */}
          {/* End hereglegchiin medeelel */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
            onPress={() =>
              navigation.navigate("UserProfileDetail", {
                id: isShared ? sharedUser._id : createUser._id,
                isLike: liked,
              })
            }
          >
            <Image
              source={{
                uri: `${api}/upload/${
                  isShared ? sharedUser.profile : createUser.profile
                }`,
              }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
                {isShared ? sharedUser.lastName : createUser.lastName}{" "}
                {isShared ? sharedUser.firstName : createUser.firstName}{" "}
              </Text>
              <Text style={{ color: colors.secondaryText }}>
                {moment(isShared ? sharedCreatedAt : createdAt).fromNow()}
              </Text>
              {/* {data.isBoost ? <Text>Boosted</Text> : <Text>Not boosted</Text>} */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PostDetailScreen", {
                id: postId,
              })
            }
          >
            {/* Body text */}

            {body ? (
              <Text style={{ margin: 10, color: colors.primaryText }}>
                {" "}
                {isShared ? sharedBody : body}{" "}
              </Text>
            ) : (
              <View style={{ margin: 10 }} />
            )}
            {/* unshared Zurag */}
            {photo && (
              <>
                <Image
                  source={{
                    uri: `${api}/upload/${photo}`,
                  }}
                  style={{ width: fullWidth, height: 350 }}
                />
                <View
                  style={{
                    margin: 10,
                    borderColor: colors.border,
                  }}
                />
              </>
            )}
            {/* shared photo */}
            {sharedPhoto && (
              <>
                <Image
                  source={{
                    uri: `${api}/upload/${sharedPhoto}`,
                  }}
                  style={{
                    width: fullWidth,
                    height: 350,
                    alignSelf: "center",
                  }}
                />
                <View
                  style={{
                    margin: 10,
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Like counts share counts comment counts */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginTop: isShared ? 20 : 0,
        }}
      >
        <Text style={{ color: colors.primaryText }}>
          {likeCount + " Таалагдсан"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginHorizontal: 20, color: colors.primaryText }}>
            {commentCount + " Коммент"}
          </Text>
          <Text style={{ color: colors.primaryText }}>
            {shareCount + " Хуваалцсан"}
          </Text>
        </View>
      </View>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      />
      {/* Like share comment do it */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={onLike}
        >
          <AntDesign
            name={liked ? "heart" : "hearto"}
            size={24}
            color={colors.primaryText}
          />
          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            {liked ? "Unlike" : "Like"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            navigation.navigate("PostDetailScreen", { id: postId })
          }
        >
          <FontAwesome name="comment" size={24} color={colors.primaryText} />
          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            Сэтгэгдэл
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ShareModalScreen", { id: postId })
          }
          style={{ flexDirection: "row" }}
        >
          <AntDesign name="sharealt" size={24} color={colors.primaryText} />
          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            Хуваалцах
          </Text>
        </TouchableOpacity>
      </View>
      {/* Line */}
      <View
        style={{
          marginTop: 10,
          borderColor: colors.border,
          marginHorizontal: 10,
        }}
      />
      {/* Zuraas  */}
      <View style={{ backgroundColor: colors.border, paddingVertical: 2 }} />
    </>
  );
};

export default Posts;

const styles = StyleSheet.create({});
