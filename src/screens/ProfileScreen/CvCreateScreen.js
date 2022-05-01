import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import useCv from "../../hooks/client/useCv";
import useUserProfile from "../../hooks/client/useUserProfile";
const CvCreateScreen = (props) => {
  const { data } = props.route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          marginHorizontal: 20,
          alignItems: "center",
        }}
      >
        <AntDesign
          name="back"
          size={30}
          color={colors.primaryText}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            textAlign: "center",
            color: colors.primaryText,
            marginLeft: 110,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          CV үүсгэх
        </Text>
      </View>
      {/*  */}
      <View style={{ margin: 20 }}>
        {/* name birth location register phoneEmergency driverlicence */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Хувийн мэдээлэл
            </Text>
            <AntDesign
              name="edit"
              size={24}
              color={colors.primaryText}
              onPress={() => navigation.navigate("PersonalDetailModal")}
            />
          </View>
          <Text style={{ color: colors.primaryText }}>
            Овог нэр: {data.lastName} {data.firstName}{" "}
          </Text>
          <Text style={{ color: colors.primaryText }}>
            Төрсөн өдөр: {data.birth}
          </Text>
          <Text style={{ color: colors.primaryText }}>
            Оршин суудаг хаяг: {data.location}
          </Text>
          <Text style={{ color: colors.primaryText }}>
            Мэргэжил: {data.profession}
          </Text>
          <Text style={{ color: colors.primaryText }}>
            Яааралтай үед холбоо барих: {data.phoneEmergency}
          </Text>
          <Text style={{ color: colors.primaryText }}>
            Жолооны үнэмлэх: {data.driverLicense}
          </Text>
        </View>
        {/* Achievment */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Шагнал медал
            </Text>
            <AntDesign name="edit" size={24} color={colors.primaryText} />
          </View>
        </View>
        {/* Course */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Боловсрол
            </Text>
            <AntDesign name="edit" size={24} color={colors.primaryText} />
          </View>
        </View>
        {/* Experience */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Туршлага
            </Text>
            <AntDesign name="edit" size={24} color={colors.primaryText} />
          </View>
        </View>
        {/* family */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Гэр бүл
            </Text>
            <AntDesign name="edit" size={24} color={colors.primaryText} />
          </View>
        </View>
        {/* skill */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Чадвар
            </Text>
            <AntDesign name="edit" size={24} color={colors.primaryText} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CvCreateScreen;

const styles = StyleSheet.create({});
