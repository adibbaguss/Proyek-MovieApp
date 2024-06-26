import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env'
import { Movie, MovieGenre } from '../../types/app';
import MovieItem from '../movies/MovieItem';
import { FlatList } from 'react-native-gesture-handler';

const coverImageSize = {
    backdrop: {
        width: 280,
        height: 160,
    },
    poster: {
        width: 100,
        height: 160,
    },
}

const CategorySearch = (): JSX.Element => {
    const [genres, setGenres] = useState<MovieGenre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();

    useEffect(() => {
        // Fetch genres from TMDB
        const fetchGenres = () => {

            const url = 'https://api.themoviedb.org/3/genre/movie/list';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                },
            };

            fetch(url, options)
                .then((response) => response.json())
                .then((response) => {
                    setGenres(response.genres);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        // Fetch movies by selected genre from TMDB
        if (selectedGenre) {
            const fetchMovies = () => {
                setIsLoading(true);
                const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                    },
                };

                fetch(url, options)
                    .then((response) => response.json())
                    .then((response) => {
                        setIsLoading(false);
                        setMovies(response.results);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
            fetchMovies();
        }
    }, [selectedGenre]);

    return (
        <View>
            <ScrollView
                style={{ marginTop: 10 }}
                horizontal
            >
                {genres.map((genre) => (
                    <TouchableOpacity
                        key={genre.id}
                        onPress={() => setSelectedGenre(genre.id)}
                        style={{
                            backgroundColor: selectedGenre === genre.id ? 'blue' : 'grey',
                            padding: 10,
                            margin: 5,
                            borderRadius: 5,

                        }}
                    >
                        <Text>{genre.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
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