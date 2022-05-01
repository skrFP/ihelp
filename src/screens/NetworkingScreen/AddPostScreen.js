import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { api } from "../../../Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
const AddPostScreen = () => {
  const { colors } = useTheme();
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState();
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const deleteImage = () => {
    setPostImage(null);
  };
  const handleUploadComplete = () => {
    setUploadProgress(0);
    setUploadTotal(0);
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);
    setUploadProgress(() => {
      return Math.round((event.loaded * 100) / event.total);
    });
  };
  const openPostImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Та зураг авах эрхийг зөвшөөрөөгүй байна.");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });
      if (!response.cancelled) {
        setPostImage(response.uri);
      }
    }
  };
  const sendNewPost = () => {
    axios
      .post(`${api}/api/v1/posts`, { body: postText })
      .then((res) => {
        const newPost = res.data.article;
        console.log(res.data.article);
        const xhr = new XMLHttpRequest();
        const fileExt = postImage.substring(postImage.lastIndexOf(".") + 1);
        xhr.addEventListener("load", (event) => handleUploadComplete(event));
        xhr.upload.addEventListener("progress", handleUploadProgress);
        const formData = new FormData();
        formData.append("file", {
          uri: postImage,
          type: `image/${fileExt}`,
          name: "new__post",
        });
        xhr.open("PUT", `${api}/api/v1/posts/${newPost._id}/photo`);
        xhr.send(formData);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (uploadTotal > 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 16 }}>
          Түр хүлээнэ үү. Зургийг илгээж байна...
        </Text>

        <View
          style={{
            height: 50,
            backgroundColor: "red",
            width: 200,
          }}
        >
          <View
            style={{
              height: 50,
              backgroundColor: "green",
              width: uploadProgress * 2,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", flex: 1, marginTop: 15 }}>
              {uploadProgress}%
            </Text>
          </View>
        </View>
      </View>
    );
  }
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 50,
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={34} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 5,
          }}
          onPress={sendNewPost}
        >
          <Text style={{ fontSize: 20 }}>Постлох</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="What's on your mind?"
        multiline={true}
        numberOfLines={10}
        onChangeText={setPostText}
        value={postText}
        placeholderTextColor={colors.primaryText}
        style={{ padding: 20, marginTop: 30, color: colors.primaryText }}
      />
      {postImage ? (
        <View>
          <AntDesign
            name="delete"
            size={24}
            color="white"
            style={{
              alignSelf: "flex-end",
              marginRight: 15,
              top: 30,
              zIndex: 1000,
              backgroundColor: "black",
              padding: 3,
            }}
            onPress={deleteImage}
          />
          <Image
            source={{ uri: postImage }}
            style={{ width: "100%", height: 350 }}
          />
        </View>
      ) : (
        <Entypo
          name="image"
          size={24}
          color={colors.primaryText}
          onPress={openPostImage}
          style={{ padding: 20 }}
        />
      )}
    </ScrollView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({});
