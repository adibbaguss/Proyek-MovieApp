import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import SearchScreen from "../screens/Search";
import MovieDetail from "../screens/Home/MovieDetail";

const SearchStackNav = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate('SearchScreen' as never);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default SearchStackNav;
