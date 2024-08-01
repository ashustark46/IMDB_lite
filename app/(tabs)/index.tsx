import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';

import HomeScreen from 'C:/Users/ASUS/my-app/screens/HomeScreen';
import MovieScreen from 'C:/Users/ASUS/my-app/screens/MovieScreen';
import PersonScreen from 'C:/Users/ASUS/my-app/screens/PersonScreen';
import SearchScreen from 'C:/Users/ASUS/my-app/screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
      <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
      <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
    </Stack.Navigator>
  );
}
