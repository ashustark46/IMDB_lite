import React, { useState, useEffect } from "react";
import { View, Text, Platform, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialIcons";
import TrendingMovies from "../components/trendingMovies";
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from '../api/moviedb';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={ios ? styles.iosSafeArea : styles.androidSafeArea}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Icon name="menu" size={30} color="white" />
          <Text style={styles.title}>
            <Text style={styles.highlight}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          {trending.length > 0 && <TrendingMovies data={trending} />}
          <MovieList title='Upcoming' data={upcoming} />
          <MovieList title='Top Rated' data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  iosSafeArea: {
    marginBottom: -2,
  },
  androidSafeArea: {
    marginBottom: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  highlight: {
    color: 'yellow',
  },
  scrollView: {
    paddingBottom: 10,
  },
});
