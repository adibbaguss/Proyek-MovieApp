import React from "react";
import { Button, StyleSheet, View } from "react-native";

type PropsHomeScreen = {
  navigation: any;
};
const HomeScreen = ({ navigation }: PropsHomeScreen) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Movie Detail"
        onPress={() =>
          navigation.navigate("MovieDetail", {
            name: "Ninja Ken",
            language: "React Native",
          })
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  marginVertical20: {
    marginVertical: 20,
  },
});

export default HomeScreen;
