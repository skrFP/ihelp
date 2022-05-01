import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import EmployeeStack from "./EmployeeStack";
import EmployerStack from "./EmployerStack";
import NetworkingStack from "./NetworkingStack";
import ProfileStack from "./ProfileStack";
import SearchStack from "./SearchStack";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  return (
    <>
      {state.isLoggedIn ? (
        <Tab.Navigator
          initialRouteName="EmployeeStack"
          sceneContainerStyle={{ backgroundColor: colors.background }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "EmployeeStack") {
                iconName = focused ? "medkit" : "medkit-outline";
              } else if (route.name === "EmployerStack") {
                iconName = focused
                  ? "cloud-circle-outline"
                  : "cloud-circle-sharp";
              } else if (route.name === "NetworkingStack") {
                iconName = focused ? "umbrella-outline" : "umbrella-sharp";
              } else if (route.name === "ProfileStack") {
                iconName = focused
                  ? "ios-people-circle-outline"
                  : "ios-people-circle";
              } else if (route.name === "SearchStack") {
                iconName = focused ? "search-circle" : "search-circle-outline";
              } else if (route.name === "AnketStack") {
                iconName = focused ? "logo-ionic" : "md-logo-ionic";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.secondaryText,
          })}
        >
          <Tab.Screen
            name="SearchStack"
            component={SearchStack}
            options={{ headerShown: false }}
          />

          <Tab.Screen
            name="EmployeeStack"
            component={EmployeeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="EmployerStack"
            component={EmployerStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="NetworkingStack"
            component={NetworkingStack}
            options={{ headerShown: false }}
          />

          <Tab.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}
