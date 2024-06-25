import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Button } from 'react-native';

const MovieDetail = ({ navigation }: any): any => {
  //   ADD FAVORITE FEATURE
  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      // mengambil data favorit dari AsyncStorge dengan kunci '@FavoriteList'
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      console.log(initialData);

      let favMovieList: Movie[] = [];

      // jika initialData !null, maka parse menjadi array favMovieList
      if (initialData !== null) {
        // menambahkan movie ke dalam array favMoviewList
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        //jika initialData = null, maka membuat array baru dengan movie sebagai elemen pertama

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

  // return
  return <View>test</View>;
};

export default MovieDetail;
