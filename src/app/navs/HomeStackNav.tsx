import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/Home";
import MovieDetail from "../screens/Home/MovieDetail";

const HomeStackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default HomeStackNav;
