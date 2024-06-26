import { View, Text, TouchableOpacity } from 'react-native';
// menambahkan useState dan useEffect
import React, { useEffect, useState } from 'react';
//untuk menggunakan icon dari fontawesome
import { FontAwesome } from '@expo/vector-icons';
// untuk menggunakan package Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Movie } from '../../../types/app';

const MovieDetail = ({ route }: any): JSX.Element => {
  const [movie, setMovie] = useState<any>(null);
  // mendefinisiakn isFavorite adn setIsFavorite sebagai state
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { id } = route.params;

  useEffect(() => {
    checkFavoriteStatus();
  }, [id]);

  //   ADD FAVORITE FEATURE
  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      // mengambil data favorit dari AsyncStorge dengan kunci '@FavoriteList'
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      console.log(initialData);

      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        // menambahkan movie ke dalam array favMoviewList
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      //   menyimpan kembali favMovieList ke AsyncStorage dengan kunci '@FavoriteList'
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      // setIsFavorite menjadi true setelah berhasil menambahkan movie ke favorit
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  //   REMOVE FAVORITE FEATURE
  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      console.log(initialData);
      // Code mengapus film dari storage
      //   perkondisian
      if (initialData !== null) {
        // Parse initialData menjadi array of objects
        let favMovieList: Movie[] = JSON.parse(initialData);

        favMovieList = favMovieList.filter((movie) => movie.id !== id);

        // Simpan kembali favMovieList yang telah diupdate ke AsyncStorage
        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));

        console.log('film berhasil dihapus dari favorit');
      } else {
        console.log('tidak ada data film favorite yang disimpan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CHECK IS FAVORITE
  const checkIsFavorite = async (id: number): Promise<boolean> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');

      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData);
        return favMovieList.some((item: Movie) => item.id === id);
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const checkFavoriteStatus = async (): Promise<void> => {
    const favoriteStatus = await checkIsFavorite(id);
    setIsFavorite(favoriteStatus);
  };

  return (
    <View>
      <Text>MovieDetail test</Text>

      {/* button for favorite */}
      <TouchableOpacity onPress={isFavorite ? () => removeFavorite(movie.id) : () => addFavorite(movie)}>
        <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={30} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetail;
