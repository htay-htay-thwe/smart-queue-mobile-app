import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/BottomTabs";
import { Theme } from "./src/themes/Theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./src/navigation/BottomTabs";
import StepStack from "./src/navigation/StepStack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          <Stack.Screen name="Screens" component={StepStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
