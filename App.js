import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { lightTheme } from "./src/themes/light";
import { darkTheme } from "./src/themes/dark.js";
import StackNavigator from "./src/stack/StackNavigator";
import { UserStore } from "./src/context/UserContext";
export default function App() {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? darkTheme : lightTheme}
    >
      <UserStore>
        <StackNavigator />
      </UserStore>
    </NavigationContainer>
  );
}
