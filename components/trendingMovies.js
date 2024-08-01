import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Movie', { item });
  };

  const renderItem = ({ item }) => (
    <MovieCard item={item} handleClick={handleClick} />
  );

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.headerText}>Trending Movies</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={width * 0.62 + 10} // Width of the item plus some margin
        contentContainerStyle={{ paddingHorizontal: (width - width * 0.62) / 2 }} // Center align
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Margin between items
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.45, borderRadius: 30 }}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TrendingMovies;
