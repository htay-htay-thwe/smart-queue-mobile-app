import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { Theme } from './src/themes/Theme';
import LoginScreen from './src/screens/Auth/LoginPage';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import BottomTabs from './src/navigation/BottomTabs';
import AccountView from './src/screens/Auth/AccountView';
import ViewLive from './app/screens/ViewLive';
import JoinQueue from './app/screens/JoinQueue';
import QueueConfirm from './app/screens/QueueConfirm';
import MyQueue from './app/screens/MyQueue';
import SettingsScreen from './src/screens/Auth/SettingsScreen';
import SupportScreen from './src/screens/Auth/SupportScreen';
import EditProfileScreen from './src/screens/Auth/EditProfileScreen';
import { UserProvider } from './src/context/UserContext';
import { QueueProvider } from './src/context/QueueContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <QueueProvider>
        <PaperProvider theme={Theme}>
         <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
           <Stack.Screen name="Login" component={LoginScreen} />
           <Stack.Screen name="SignUp" component={SignUpScreen} />
           <Stack.Screen name="Home" component={BottomTabs} />
           <Stack.Screen 
             name="Account" 
             component={AccountView}
             options={{
               animation: 'slide_from_left'
             }}
           />
           <Stack.Screen name="ViewLive" component={ViewLive} />
           <Stack.Screen name="JoinQueue" component={JoinQueue} />
           <Stack.Screen name="QueueConfirm" component={QueueConfirm} />
           <Stack.Screen name="MyQueue" component={MyQueue} />
           <Stack.Screen name="Settings" component={SettingsScreen} />
           <Stack.Screen name="Support" component={SupportScreen} />
           <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
      </QueueProvider>
    </UserProvider>
  );
}