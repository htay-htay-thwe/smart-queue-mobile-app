import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../screens/HomePage";
import QRScanScreen from "src/screens/QR";
import NotificationsScreen from "src/screens/notifications";
import MyQueuesScreen from "src/screens/MyQueues";
import SearchScreen from "src/screens/search";
import JoinQueueScreen from "src/screens/JoinQueue";
import DisplayScreen from "src/screens/Display";
import ViewLiveScreen from "src/screens/ViewLive";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="QRScan" component={QRScanScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="MyQueues" component={MyQueuesScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="JoinQueue" component={JoinQueueScreen} />
      <Stack.Screen name="Display" component={DisplayScreen} />
      <Stack.Screen name="ViewLive" component={ViewLiveScreen} />
    </Stack.Navigator>
  );
}
