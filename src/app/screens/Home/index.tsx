import axios from "axios";
import React, { useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

type PropsHomeScreen = {
  navigation: any;
};

const HomeScreen = ({ navigation }: PropsHomeScreen) => {
  const [result, setResult] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchData = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular`, {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setResult(res.data);
        setIsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Button title="Tampilkan Detail Film" onPress={fetchData} />
      {isDataLoaded && (
        <Text style={styles.marginVertical20}>Data berhasil diambil!</Text>
      )}
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
