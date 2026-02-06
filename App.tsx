import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { Theme } from './src/themes/Theme';
import LoginScreen from './src/screens/Auth/LoginPage';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import EditProfileScreen from './src/screens/Auth/EditProfileScreen';
import EditSuccessScreen from './src/screens/Auth/EditSuccessScreen';
import AccountView from './src/screens/Auth/AccountView';
import SupportScreen from './src/screens/Auth/SupportScreen';
import ContactUsScreen from './src/screens/Auth/ContactUsScreen';
import SettingsScreen from './src/screens/Auth/SettingsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AccountView">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="EditSuccess" component={EditSuccessScreen} />
          <Stack.Screen name="AccountView" component={AccountView} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}