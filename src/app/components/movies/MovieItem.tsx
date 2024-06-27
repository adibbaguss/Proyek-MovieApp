import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { MovieItemProps } from "services/data-types";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { StackActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MovieItem = ({ movie, size, coverType }: MovieItemProps) => {
  const navigation = useNavigation();
  const pushAction = StackActions.push("MovieDetail", {
    id: movie.id,
  });
  return (
    <TouchableOpacity
      style={{
        padding: 4,
        borderRadius: 8,
      }}
      onPress={() => {
        navigation.dispatch(pushAction);
      }}
    >
      <ImageBackground
        resizeMode="cover"
        style={[size, styles.backgroundImage]}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${
            coverType === "backdrop" ? movie.backdrop_path : movie.poster_path
          }`,
        }}
      >
        <LinearGradient
          colors={["#00000000", "rgba(0, 0, 0, 0.7)"]}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    marginRight: 4,
    borderRadius: 8,
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  movieTitle: {
    color: "white",
  },
  gradientStyle: {
    padding: 8,
    height: "100%",
    width: "100%",
    borderRadius: 8,
    display: "flex",
    justifyContent: "flex-end",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  rating: {
    color: "yellow",
    fontWeight: "700",
  },
});

export default MovieItem;
