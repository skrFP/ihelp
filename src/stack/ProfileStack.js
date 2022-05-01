import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfileScreen from "../screens/ProfileScreen/UserProfileScreen";
import CvCreateScreen from "../screens/ProfileScreen/CvCreateScreen";
import PersonalDetailModal from "../screens/ProfileScreen/Edit/PersonalDetailModal";
const ProfileStack = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Group>
        <ProfileStack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
        <ProfileStack.Screen
          name="CvCreateScreen"
          component={CvCreateScreen}
          options={{ headerShown: false }}
        />
      </ProfileStack.Group>
      <ProfileStack.Group>
        <ProfileStack.Screen
          name="PersonalDetailModal"
          component={PersonalDetailModal}
          options={{
            headerShown: false,
            presentation: "formSheet",
          }}
        />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};

export default ProfileStack;
