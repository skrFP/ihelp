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
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import React from "react";
import * as Linking from "expo-linking";
import { api } from "../../../Constants";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import useCompanyProfile from "../../hooks/company/useCompanyProfile";
import useCompanyJobs from "../../hooks/company/useCompanyJobs";
const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;

const CompanyProfileDetail = () => {
  const [companyProfile] = useCompanyProfile();
  const [companyJobs, errorMessage, loading] = useCompanyJobs();
  if (!companyProfile) {
    return null;
  }
  if (errorMessage) {
    return (
      <Text style={{ color: "red", margin: 30 }}>
        Алдаа гарлаа! {errorMessage}
      </Text>
    );
  }
  if (!companyJobs) {
    return null;
  }
  return (
    <>
      <Header />
      <ScrollView>
        <Image
          source={{ uri: `${api}/upload/${companyProfile.cover}` }}
          style={{ width: fullWidth, height: fullHeight / 4 }}
        />
        {/* Profile Pic and Name Follow Unfollow */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Pro pic and Name category */}
          <View
            style={{
              flexDirection: "row",
              padding: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: `${api}/upload/${companyProfile.profile}` }}
              style={{ width: 60, height: 60, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: "black", fontWeight: "bold" }}>
                {companyProfile.name}
              </Text>
              <Text style={{ color: "grey" }}>
                {companyProfile.category && companyProfile.category.name}
              </Text>
            </View>
          </View>
          {/* Follow unfollow */}
          <View style={{ padding: 30, alignItems: "center" }}>
            <SimpleLineIcons name="user-follow" size={24} color="black" />
            {/* <SimpleLineIcons name="user-unfollow" size={24} color="black" /> */}
            <Text>Follow</Text>
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
          >
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <FontAwesome name="send" size={24} color="black" />
              <Text style={{ textAlign: "center" }}>CV Илгээх</Text>
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
            <Text>{companyProfile.jobNumber}</Text>
            <Text>Jobs</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 1 }} />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Text>{companyProfile.follower}</Text>
            <Text>Follower</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 1 }} />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Text>{companyProfile.following}</Text>
            <Text>Following</Text>
          </TouchableOpacity>
        </View>
        {/* Line  */}
        <View style={{ padding: 3, backgroundColor: "grey" }} />
        {/* About */}
        <View style={{ marginHorizontal: 20 }}>
          <Text>Компанийн мэдээлэл</Text>
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
              color="black"
              style={{ width: "10%" }}
            />
            <Text style={{ flexDirection: "row", width: "95%" }}>
              {companyProfile.about}
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
              color="black"
              style={{ width: "10%" }}
            />
            <Text
              style={{ flexDirection: "row", width: "95%", color: "blue" }}
              onPress={() => Linking.openURL(`${companyProfile.web}`)}
            >
              {companyProfile.web}
            </Text>
          </View>
          {/* Phone */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <AntDesign
              name="phone"
              size={20}
              color="black"
              style={{ width: "10%" }}
            />
            <Text
              style={{ flexDirection: "row", width: "95%", color: "blue" }}
              onPress={() => Linking.openURL(`tel:${companyProfile.phone}`)}
            >
              {companyProfile.phone}
            </Text>
          </View>
          {/* Ажилтны тоо */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <FontAwesome5
              name="people-arrows"
              size={20}
              color="black"
              style={{ width: "10%" }}
            />
            <Text style={{ flexDirection: "row", width: "95%" }}>
              {companyProfile.employerNumber} Хүмүүс ажилдаг
            </Text>
          </View>
          {/* Ажилтны тоо */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Ionicons
              name="create"
              size={24}
              color="black"
              style={{ width: "10%" }}
            />
            <Text style={{ flexDirection: "row", width: "95%" }}>
              {companyProfile.createYear.slice(0, 4)} онд үүссэн
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Ionicons
              name="location-sharp"
              size={24}
              color="black"
              style={{ width: "10%" }}
            />

            <Text style={{ flexDirection: "row", width: "95%" }}>
              {companyProfile.location} онд үүссэн
            </Text>
          </View>
        </View>
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
            source={{ uri: `${api}/upload/${companyProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
          <Image
            source={{ uri: `${api}/upload/${companyProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
          <Image
            source={{ uri: `${api}/upload/${companyProfile.profile}` }}
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
            source={{ uri: `${api}/upload/${companyProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
          <Image
            source={{ uri: `${api}/upload/${companyProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
          <Image
            source={{ uri: `${api}/upload/${companyProfile.profile}` }}
            style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
          />
        </View>
        {/* Line */}
        <View style={{ padding: 3, backgroundColor: "grey" }} />
        {/* Ажлын зарууд */}
        {loading ? (
          <Spinner />
        ) : (
          <View style={{ marginHorizontal: 20 }}>
            <Text>Ажлын зарууд</Text>
            {companyJobs.map((e) => {
              return (
                <View
                  key={e._id}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "grey",
                    marginVertical: 3,
                    padding: 6,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {e.createUser && (
                      <Image
                        source={{
                          uri: `${api}/upload/${e.createUser.profile}`,
                        }}
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                      />
                    )}
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {e.occupation && e.occupation.name}
                      </Text>
                      <Text style={{ marginVertical: 15 }}>{e.salary}</Text>
                      <Text>
                        {e.type} -{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {e.createUser && e.createUser.name}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <FontAwesome name="heart" size={35} color="red" />
                  {/* <FontAwesome name="heart-o" size={24} color="black" /> */}
                </View>
              );
            })}
          </View>
        )}
        <View style={{ marginVertical: 50 }} />
      </ScrollView>
    </>
  );
};

export default CompanyProfileDetail;

const styles = StyleSheet.create({});
