import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/mn";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
const fullWidth = Dimensions.get("screen").width;
import NetworkingTextInput from "../../components/NetworkingTextInput";
const PostDetailScreen = (props) => {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const [postDetail, setPostDetail] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    let source = axios.CancelToken.source();
    const loadData = () => {
      axios
        .get(`${api}/api/v1/posts/${id}`, { cancelToken: source.token })
        .then((res) => {
          setPostDetail(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, []);
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    setRefresh(false);
    let source = axios.CancelToken.source();
    const loadComment = () => {
      axios
        .get(`${api}/api/v1/comments/${id}/post?sort=-createdAt`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setCommentData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadComment();
    return () => {
      source.cancel();
    };
  }, [refresh]);
  const [commentText, setCommentText] = useState("Hi guys!");
  const postComment = () => {
    setRefresh(false);
    axios
      .post(`${api}/api/v1/comments/${id}`, { description: commentText })
      .then((res) => {
        console.log(res.data.data);
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [liked, setLiked] = useState(postDetail.isLiked);

  const onLike = () => {
    if (liked) {
      setLiked(false);
      axios.delete(`${api}/api/v1/likes/${id}`);
    } else {
      setLiked(true);
      axios
        .post(`${api}/api/v1/likes/${id}`)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!postDetail) {
    return null;
  }

  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <View style={{ height: 100 }}>
        {postDetail.sharePost ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: 50,
              marginHorizontal: 10,
            }}
          >
            {postDetail.createUser && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="left"
                  size={24}
                  color="white"
                  onPress={() => navigation.goBack()}
                />
                <Image
                  source={{
                    uri: `${api}/upload/${postDetail.createUser.profile}`,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text
                    style={{ color: colors.primaryText, fontWeight: "bold" }}
                  >
                    {postDetail.createUser.lastName}{" "}
                    {postDetail.createUser.firstName}
                  </Text>
                  <Text style={{ color: colors.secondaryText }}>
                    {moment(postDetail.createdAt).fromNow()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginTop: 50,
              marginHorizontal: 10,
            }}
          >
            {postDetail.createUser && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="left" size={24} color="white" />
                <Image
                  source={{
                    uri: `${api}/upload/${postDetail.createUser.profile}`,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text
                    style={{ color: colors.primaryText, fontWeight: "bold" }}
                  >
                    {postDetail.createUser.lastName}{" "}
                    {postDetail.createUser.firstName}
                  </Text>
                  <Text style={{ color: colors.secondaryText }}>
                    {moment(postDetail.createdAt).fromNow()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
      <ScrollView>
        {/* Middle content */}
        <View style={{ marginTop: postDetail.isShare && 10 }}>
          {/* User detail and body and photos */}
          <View
            style={{
              marginHorizontal: postDetail.isShare ? 10 : 0,
              borderWidth: postDetail.isShare ? 1 : 0,
              borderColor: colors.border,
            }}
          >
            {/* postDetail.isShare true false aaraa sharelesen zar uguin ylgaa garna */}
            {/* End hereglegchiin medeelel */}
            {postDetail.sharePost && postDetail.createUser && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <Image
                  source={{
                    uri: `${api}/upload/${
                      postDetail.isShare
                        ? postDetail.sharePost.createUser.profile
                        : postDetail.createUser.profile
                    }`,
                  }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{ fontWeight: "bold", color: colors.primaryText }}
                  >
                    {postDetail.isShare
                      ? postDetail.sharePost.createUser.lastName
                      : postDetail.createUser.lastName}{" "}
                    {postDetail.isShare
                      ? postDetail.sharePost.createUser.firstName
                      : postDetail.createUser.firstName}{" "}
                  </Text>
                  <Text style={{ color: colors.secondaryText }}>
                    {moment(
                      postDetail.isShare
                        ? postDetail.sharePost.createdAt
                        : postDetail.createdAt
                    ).fromNow()}
                  </Text>
                  {/* {data.isBoost ? <Text>Boosted</Text> : <Text>Not boosted</Text>} */}
                </View>
              </View>
            )}

            {/* Body text */}

            {postDetail.body ? (
              <Text style={{ margin: 10, color: colors.primaryText }}>
                {postDetail.isShare
                  ? postDetail.sharePost && postDetail.sharePost.body
                  : postDetail.body}
              </Text>
            ) : (
              <View style={{ margin: 10 }} />
            )}
            {/* unshared Zurag */}
            {postDetail.photo && (
              <>
                <Image
                  source={{
                    uri: `${api}/upload/${postDetail.photo}`,
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
            {postDetail.sharePost && (
              <>
                {postDetail.sharePost.photo && (
                  <Image
                    source={{
                      uri: `${api}/upload/${postDetail.sharePost.photo}`,
                    }}
                    style={{
                      width: fullWidth,
                      height: 350,
                      alignSelf: "center",
                    }}
                  />
                )}

                <View
                  style={{
                    margin: 10,
                  }}
                />
              </>
            )}
          </View>
        </View>

        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
            marginHorizontal: 10,
            // marginTop: postDetail.isShare ? 20 : 0,
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
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="comment" size={24} color={colors.primaryText} />
            <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
              Сэтгэгдэл
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ShareModalScreen", { id: id })}
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
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
            marginHorizontal: 10,
            // marginTop: postDetail.isShare ? 20 : 0,
          }}
        />
        {postDetail.share > 0 && (
          <View style={{ margin: 10 }}>
            <Text style={{ color: colors.primaryText, fontWeight: "bold" }}>
              {postDetail.share} Хуваалцсан
            </Text>
          </View>
        )}

        {commentData.map((e) => {
          return (
            <View key={e._id} style={{ width: fullWidth }}>
              {e.createUser && (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                    width: fullWidth,
                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    source={{ uri: `${api}/upload/${e.createUser.profile}` }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: fullWidth / 1.26,
                      backgroundColor: colors.border,
                      borderRadius: 10,
                      marginLeft: 10,
                      padding: 10,
                    }}
                  >
                    <View>
                      <Text style={{ color: colors.primaryText }}>
                        {e.createUser.lastName} {e.createUser.firstName}
                      </Text>
                      <Text style={{ color: colors.secondaryText }}>
                        {e.description}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: colors.secondaryText,
                        width: 60,
                        textAlign: "center",
                      }}
                    >
                      {moment(e.createdAt).fromNow()}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <NetworkingTextInput
        value={commentText}
        onChangeText={setCommentText}
        onPress={postComment}
      />
    </KeyboardAvoidingView>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({});
