import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { API_ACCESS_TOKEN } from "@env";
import { Movie } from "services/data-types";
import MovieItem from "../movies/MovieItem";

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${keyword}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    setMovies(data.results);
    setIsLoading(false);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
        <TextInput
          placeholder="Search movies..."
          value={keyword}
          onChangeText={setKeyword}
          style={{
            flex: 1,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 5,
          }}
        />
        {isLoading ? (
          <ActivityIndicator style={{ marginLeft: 10 }} />
        ) : (
          <TouchableOpacity
            onPress={fetchMovies}
            style={{
              marginLeft: 10,
              borderStyle: "solid",
              padding: 10,
              borderWidth: 1,
              borderColor: "#007AFF",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#007AFF" }}>Search</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : movies.length > 0 ? (
        <FlatList
          data={movies}
          numColumns={3}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No movies found.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default KeywordSearch;
