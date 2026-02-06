import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { Theme } from './src/themes/Theme';
import BottomTabs from './src/navigation/BottomTabs';
import StepStack from './src/navigation/StepStack';
import LoginScreen from './src/screens/Auth/LoginPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={Theme}>
       <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          <Stack.Screen name="Screens" component={StepStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}