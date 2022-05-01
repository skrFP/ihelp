import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NetworkingScreen from "../screens/NetworkingScreen/NetworkingScreen";
import PostDetailScreen from "../screens/NetworkingScreen/PostDetailScreen";
import UserProfileDetail from "../screens/DynamicScreen/UserProfileDetail";
import ShareModalScreen from "../components/Networking/ShareModalScreen";
import AddPostScreen from "../screens/NetworkingScreen/AddPostScreen";
const NetworkingStack = () => {
  const NetworkingStack = createNativeStackNavigator();

  return (
    <NetworkingStack.Navigator>
      <NetworkingStack.Group>
        <NetworkingStack.Screen
          name="NetworkingScreen"
          component={NetworkingScreen}
          options={{ headerShown: false }}
        />
        <NetworkingStack.Screen
          name="PostDetailScreen"
          component={PostDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <NetworkingStack.Screen
          name="UserProfileDetail"
          component={UserProfileDetail}
          options={{ headerShown: false }}
        />
      </NetworkingStack.Group>
      <NetworkingStack.Group>
        <NetworkingStack.Screen
          name="ShareModalScreen"
          component={ShareModalScreen}
          options={{
            headerShown: false,
            presentation: "formSheet",
          }}
        />
        <NetworkingStack.Screen
          name="AddPostScreen"
          component={AddPostScreen}
          options={{
            headerTitle: "Пост оруулах",
            headerShown: false,
          }}
        />
      </NetworkingStack.Group>
    </NetworkingStack.Navigator>
  );
};

export default NetworkingStack;
