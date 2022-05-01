import { Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import Posts from "../../components/Networking/Posts";
import { useTheme } from "@react-navigation/native";
import NetworkingHeader from "../../components/Networking/NetworkingHeader";
import UserContext from "../../context/UserContext";
const NetworkingScreen = () => {
  const state = useContext(UserContext);
  const [followData, setFollowData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pagination, setPagination] = useState();
  const [noMore, setNoMore] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    let source = axios.CancelToken.source();
    const loadData = () => {
      axios
        .get(
          `${api}/api/v1/posts/${state.userId}/following?limit=4&sort=-createdAt&page=${pageCurrent}`,
          { cancelToken: source.token }
        )
        .then((res) => {
          setFollowData([...followData, ...res.data.data]);
          setPagination(res.data.pagination);
          setErrorMessage(null);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [pageCurrent]);
  const renderFooter = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  };
  const handleMore = () => {
    if (pageCurrent >= pagination.pageCount) {
      setNoMore(true);
    } else {
      setPageCurrent(pageCurrent + 1);
      setIsLoading(true);
    }
  };
  const NoMoreData = () => {
    return noMore ? (
      <View>
        <Text> Дата байхгүй байна дууссан </Text>
      </View>
    ) : null;
  };

  const { colors } = useTheme();
  return (
    <View>
      <NetworkingHeader />
      {errorMessage ? (
        <View>
          <Text style={{ fontSize: 40, color: colors.primaryText }}>
            {" "}
            Алдаа гарлаа! {errorMessage}{" "}
          </Text>
        </View>
      ) : (
        <FlatList
          data={followData}
          ListFooterComponent={noMore ? NoMoreData : renderFooter}
          onEndReached={handleMore}
          initialNumToRender={5}
          onEndReachedThreshold={0}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <View style={{ backgroundColor: colors.background }}>
                {item.sharePost && (
                  <Posts
                    postId={item._id}
                    createUser={item.createUser}
                    createdAt={item.createdAt}
                    body={item.body}
                    photo={item.photo}
                    isShared={item.isShare}
                    sharedUser={item.sharePost && item.sharePost.createUser}
                    sharedCreatedAt={item.sharePost && item.sharePost.createdAt}
                    sharedBody={item.sharePost && item.sharePost.body}
                    sharedPhoto={item.sharePost && item.sharePost.photo}
                    likeCount={item.like}
                    commentCount={item.comment}
                    shareCount={item.share}
                    isLiked={item.isLiked}
                  />
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default NetworkingScreen;
