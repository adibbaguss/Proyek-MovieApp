import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, StackActions } from '@react-navigation/native'; // Menggunakan @react-navigation/native untuk navigasi
import MovieItem from '@/app/components/movies/MovieItem';
import { Movie } from '@/app/types/app';

const FavoriteScreen = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const navigation = useNavigation();

  // Fungsi untuk mengambil film favorit dari AsyncStorage
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

  // Menggunakan useFocusEffect untuk memanggil fetchFavoriteMovies ketika layar fokus
  useFocusEffect(
    useCallback(() => {
      fetchFavoriteMovies();
    }, [])
  );

  // Jika tidak ada film favorit, tampilkan pesan
  if (favoriteMovies.length === 0) {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.textEmpty}>Tidak Ada Movie Favorit yang ditemukan</Text>
      </View>
    );
  }

  // Render item pada FlatList untuk menampilkan daftar film favorit
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      <FlatList
        data={favoriteMovies}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemMovie}
            onPress={() => {
              console.log('Navigating to MovieDetail with ID:', item.id);
              navigation.dispatch(StackActions.push('MovieDetail', { id: item.id }));
            }}
          >
            <MovieItem
              movie={item}
              size={{ width: 100, height: 160 }} // Adjust the width and height as per your design
              coverType="poster"
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.id}`}
        numColumns={3} // Menampilkan dalam 3 kolom
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemMovie: {
    flex: 1,
    margin: 8,
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
});

export default FavoriteScreen;
