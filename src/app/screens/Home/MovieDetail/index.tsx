import MovieList from '@/app/components/movies/MovieList';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Movie } from 'services/data-types';
import { getMovieDetail } from 'services/movie';
import FavoriteButton from '@/app/components/favorite/favoriteButton';

type PropsDetail = {
  route: any;
};

const MovieDetail = ({ route }: PropsDetail) => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [imageHeight, setImageHeight] = useState(200);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const detailResponse = await getMovieDetail(id);
      setMovie(detailResponse.responseData);
    };
    fetchMovieDetail();
  }, [id]);

  console.log('====================================');
  console.log('Detail Movie : ', movie);
  console.log('====================================');

  return (
    <View>
      {movie && (
        <>
          <ImageBackground
            resizeMode="cover"
            style={styles.backdropImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            onLayout={(event) => setImageHeight(event.nativeEvent.layout.height)}
          >
            <LinearGradient colors={['#00000000', 'rgba(0, 0, 0, 0.7)']} locations={[0.6, 0.8]} style={[styles.gradientStyle, { height: imageHeight }]}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.ratingFavoriteContainer}>
                <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
                <FavoriteButton movie={movie} />
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.content}>
            <Text>{movie.overview}</Text>
            <View style={styles.mainContent}>
              <View>
                <Text style={styles.textTitle}>Original Language</Text>
                <Text>{movie.original_language}</Text>
              </View>
              <View>
                <Text style={styles.textTitle}>Popularity</Text>
                <Text>{movie.popularity}</Text>
              </View>
            </View>
            <View style={[styles.mainContent, { gap: 85 }]}>
              <View>
                <Text style={styles.textTitle}>Release date</Text>
                <Text>{new Date(movie.release_date).toLocaleDateString()}</Text>
              </View>
              <View>
                <Text style={styles.textTitle}>Vote Count</Text>
                <Text>{movie.vote_count}</Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={styles.list}>
              <MovieList title="Recommendations" path={`/movie/${movie.id}/recommendations`} coverType="poster" />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    flex: 1,
  },
  gradientStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 10,
  },
  movieTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  ratingFavoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  rating: {
    color: 'yellow',
  },
  backdropImage: {
    width: 'auto',
  },
  content: {
    padding: 20,
  },
  mainContent: {
    flexDirection: 'row',
    margin: 10,
    gap: 50,
  },
  textTitle: {
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default MovieDetail;
