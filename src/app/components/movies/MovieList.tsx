import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Movie, MovieListProps } from "services/data-types";
import { getMovieList } from "services/movie";
import MovieItem from "./MovieItem";

const MovieList = ({ title, path, coverType }: MovieListProps) => {
  const [movie, setMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      const response = await getMovieList(path);
      if (!response.error) {
        setMovie(response.data.results);
      }
    };
    fetchMovieList();
  }, [path]);

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        style={{
          ...styles.movieList,
          maxHeight: coverImageSize[coverType].height,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={movie}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={coverImageSize[coverType]}
            coverType={coverType}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8978A4",
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
});
const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
};
export default MovieList;
