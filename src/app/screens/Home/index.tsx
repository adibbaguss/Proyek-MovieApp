import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { getMovieCategory } from "services/movie";

type PropsHomeScreen = {
  navigation: any;
};

const HomeScreen = ({ navigation }: PropsHomeScreen) => {
  const [result, setResult] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getMovieCategory();
      if (!response.error) {
        setResult(response.data);
        setIsDataLoaded(true);
        console.log(response.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
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
