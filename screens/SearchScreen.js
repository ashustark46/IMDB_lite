import React, { useCallback, useState } from 'react';
import { View, Text, Image, Dimensions, Platform, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading from '../components/loading';
import { image185, fetchSearchMovies } from '@/api/moviedb';
import debounce from 'lodash.debounce';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = value => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      }).then(data => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search Movies'
          placeholderTextColor={'lightgrey'}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.closeButton}>
          <MaterialIcons name="close" size={25} color='white' />
        </TouchableOpacity>
      </View>

      {/* Result */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          <Text style={styles.resultText}>Results ({results.length})</Text>
          <View style={styles.resultContainer}>
            {results.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                <View style={styles.resultItem}>
                  <Image
                    style={styles.resultImage}
                    source={{ uri: image185(item?.poster_path) }}
                  />
                  <Text style={styles.movieName}>{item?.title.length > 22 ? `${item?.title.slice(0, 22)}...` : item?.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noResultsContainer}>
          <Image source={require('../Img/3110.jpg')} style={styles.noResultsImage} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D3D3D',
    borderRadius: 50,
  },
  searchInput: {
    paddingBottom: 4,
    paddingLeft: 16,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  closeButton: {
    borderRadius: 50,
    padding: 12,
    margin: 4,
    backgroundColor: '#3D3D3D',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  resultText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  resultContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resultItem: {
    marginBottom: 16,
    alignItems: 'center',
  },
  resultImage: {
    borderRadius: 24,
    width: width * 0.44,
    height: height * 0.3,
  },
  movieName: {
    color: '#A0A0A0',
    marginLeft: 4,
  },
  noResultsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noResultsImage: {
    height: 384,
    width: 384,
  },
});

export default SearchScreen;
