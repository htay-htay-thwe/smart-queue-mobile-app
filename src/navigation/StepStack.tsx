import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinQueue from "../../app/screens/JoinQueue";
import QueueConfirm from "../../app/screens/QueueConfirm";
import { Text, TouchableOpacity, View } from "react-native";
import MyQueue from "../../app/screens/MyQueue";
import ViewLive from "../../app/screens/ViewLive";
import LoginScreen from './../screens/Auth/LoginPage';
import EditProfileScreen from "../screens/Auth/EditProfileScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import EditSuccessScreen from "../screens/Auth/EditSuccessScreen";
import AccountView from "../screens/Auth/AccountView";
import SupportScreen from "../screens/Auth/SupportScreen";
import ContactUsScreen from "../screens/Auth/ContactUsScreen";
import SettingsScreen from "../screens/Auth/SettingsScreen";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();

export default function StepStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AccountView">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="EditSuccess" component={EditSuccessScreen} />
            <Stack.Screen name="AccountView" component={AccountView} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="JoinQueue" component={JoinQueue}
                options={{
                    headerShown: true,
                    headerTitle: "Join Queue",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: "500",
                        color: "black"
                    },
                }} />
            <Stack.Screen
                name="QueueConfirm"
                component={QueueConfirm}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTitle: "Queue Confirmed",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("MainTabs", { screen: "HomePage" })}
                            style={{ marginRight: 26 }}>
                            <Ionicons name="arrow-back" size={22} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="MyQueue"
                component={MyQueue}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTitle: "",
                    headerLeft: () => (
                        <View style={{ paddingTop: 28, backgroundColor: 'white' }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    minHeight: 56
                                }}>
                                <Entypo name="chevron-small-left" size={32}
                                    onPress={() => navigation.navigate("HomePage" as never)}
                                    color="#000"
                                    style={{ marginRight: 18, padding: 0 }} />

                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                                    My Queues
                                </Text>
                            </View>
                        </View>
                    ),
                })}
            />
            <Stack.Screen
                name="LiveQueue"
                component={ViewLive}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTitle: "Live Queue",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginRight: 26 }}>
                            <Entypo name="chevron-small-left" size={32}
                                color="#000" />
                        </TouchableOpacity>
                    ),
                })}
            />


        </Stack.Navigator>
    );
}