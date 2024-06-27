import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MovieItem from '@/app/components/movies/MovieItem';
import { Movie } from 'services/data-types';

const FavoriteScreen = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const fetchFavoriteMovies = async (): Promise<void> => {
    try {
      const storedFavorites: string | null = await AsyncStorage.getItem('@FavoriteList');
      if (storedFavorites) {
        setFavoriteMovies(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.log('Error Fetching favorite', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoriteMovies();
    }, [])
  );

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  if (favoriteMovies.length === 0) {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.textEmpty}>Tidak Ada Movie Favorit yang ditemukan</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={favoriteMovies}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <MovieItem movie={item} size={{ width: 100, height: 160 }} coverType="poster" />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    fontSize: 20,
  },
  list: {
    paddingBottom: 16,
  },
  itemContainer: {
    flex: 1,
    margin: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default FavoriteScreen;
