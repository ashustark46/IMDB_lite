import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Image, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, image500 } from '@/api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const MovieScreen = () => {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovieDetails(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    setLoading(true);
    const movieData = await fetchMovieDetails(id);
    const castData = await fetchMovieCredits(id);
    const similarMoviesData = await fetchSimilarMovies(id);
    if (movieData && castData && similarMoviesData) {
      setMovie(movieData);
      setCast(castData.cast);
      setSimilarMovies(similarMoviesData.results);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* back button and movie poster */}
      <View style={styles.fullWidth}>
        <SafeAreaView style={[styles.safeArea, ios ? null : styles.topMargin]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <MaterialIcons name="favorite" size={35} color={isFavourite ? 'red' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image500(movie?.poster_path) }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.40 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={[styles.movieDetails, { marginTop: -(height * 0.4) }]}>
        {/* title */}
        <Text style={styles.movieTitle}>{movie?.title}</Text>
        {/* status, release, runtime */}
        {movie?.id && (
          <Text style={styles.movieInfo}>
            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
          </Text>
        )}
        {/* genres */}
        <View style={styles.genresContainer}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length; // Use movie.genres.length
            return (
              <Text key={index} style={styles.genreText}>
                {genre?.name} {showDot ? '•' : null}
              </Text>
            )
          })}
        </View>
        {/* description */}
        <Text style={styles.description}>{movie?.overview}</Text>
      </View>

      {/* Cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* Movie List */}
      <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20,
    flexGrow: 1,
    backgroundColor: '#1F1F1F',
  },
  fullWidth: {
    width: '100%',
  },
  safeArea: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  topMargin: {
    marginTop: 12,
  },
  backButton: {
    backgroundColor: 'yellow',
    borderRadius: 12,
    padding: 4,
  },
  movieDetails: {
    padding: 16,
  },
  movieTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 3,
  },
  movieInfo: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  genreText: {
    color: '#B0B0B0',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 4,
  },
  description: {
    color: '#B0B0B0',
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
});

export default MovieScreen;
