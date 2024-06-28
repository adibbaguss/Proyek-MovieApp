import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MovieItem from "../movies/MovieItem";
import { FlatList } from "react-native-gesture-handler";
import { Movie, MovieGenre } from "services/data-types";
import { getGenreList, getMovieByGenre } from "services/movie";

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

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenresLoading, setIsGenresLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch genres from TMDB
    const fetchGenres = async () => {
      setIsGenresLoading(true);
      const genresResponse = await getGenreList();
      setGenres(genresResponse.responseData);
      setIsGenresLoading(false);
    };
    fetchGenres();
    console.log("fetchGenres", genres);
  }, []);

  useEffect(() => {
    // Fetch movies by selected genre from TMDB
    if (selectedGenre) {
      const fetchMovies = async () => {
        setIsLoading(true);
        const moviesResponse = await getMovieByGenre(selectedGenre);
        setMovies(moviesResponse.responseData);
        setIsLoading(false);
      };
      fetchMovies();
    }
  }, [selectedGenre]);

  return (
    <View>
      {isGenresLoading ? (
        <ActivityIndicator size="large" style={{ marginTop: 15 }} />
      ) : (
        <ScrollView style={{ marginTop: 10 }} horizontal>
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              onPress={() => setSelectedGenre(genre.id)}
              style={{
                backgroundColor: selectedGenre === genre.id ? "#8978A4" : "#C0B4D5",
                padding: 10,
                margin: 5,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white' }}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={{ marginTop: 10 }}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              coverType="poster"
              size={coverImageSize.poster}
            />
          )}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default CategorySearch;
