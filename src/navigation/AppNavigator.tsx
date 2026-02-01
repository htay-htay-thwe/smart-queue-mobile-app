import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "../screens/Auth/LoginPage";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
    </Stack.Navigator>
  );
}
