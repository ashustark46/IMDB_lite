import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image185 } from '@/api/moviedb';

const { width, height } = Dimensions.get('window');

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={[styles.headerText, styles.seeAllText]}>See All</Text>
            </TouchableOpacity>
          )
        }
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push('Movie', item)}
          >
            <View style={styles.movieContainer}>
              <Image
                source={{ uri: image185(item.poster_path) }}
                style={styles.movieImage}
              />
              <Text style={styles.movieName}>
                {
                  item.title && item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                }
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 4,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  seeAllText: {
    color: 'yellow',
    fontSize: 16,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  movieContainer: {
    marginRight: 10,
    marginBottom: 4,
    alignItems: 'center',
  },
  movieImage: {
    width: width * 0.33,
    height: height * 0.22,
    borderRadius: 10,
  },
  movieName: {
    color: '#ccc',
    marginTop: 4,
  },
});

export default MovieList;
