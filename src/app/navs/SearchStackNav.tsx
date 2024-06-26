import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/Search";
import MovieDetail from "../screens/Home/MovieDetail";

const SearchStackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default SearchStackNav;
