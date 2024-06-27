import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Movie } from 'services/data-types';

type FavoriteButtonProps = {
  movie: Movie;
};

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, [movie]);

  const addFavorite = async (): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      let favMovieList: Movie[] = initialData ? JSON.parse(initialData) : [];
      favMovieList.push(movie);
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      setIsFavorite(true);
      console.log(movie.id, ' tambah favorite');
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      if (initialData) {
        let favMovieList: Movie[] = JSON.parse(initialData);
        favMovieList = favMovieList.filter((favMovie) => favMovie.id !== movie.id);
        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
        setIsFavorite(false);
        console.log(movie.id, ' hapus favorite');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkFavoriteStatus = async (): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      if (initialData) {
        const favMovieList: Movie[] = JSON.parse(initialData);
        const isFav = favMovieList.some((favMovie) => favMovie.id === movie.id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={isFavorite ? removeFavorite : addFavorite}>
      <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={30} color="#ff0000" />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
