import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '@/api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const PersonScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPersonDetails(item.id)
    getPersonMovies(item.id)
  }, [item])

  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data)
    setLoading(false)
  }

  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast)
    setLoading(false)
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      {/*Back Button*/}
      <SafeAreaView style={[styles.safeArea, ios ? null : styles.verticalMargin]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <MaterialIcons name="favorite" size={35} color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/*Person details */}
      {
        loading ? (
          <Loading />
        ) : (
          <View>
            <View style={styles.imageContainer}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: image342(person?.profile_path) }} style={styles.personImage} />
              </View>
            </View>
            <View style={styles.personInfoContainer}>
              <Text style={styles.personName}>{person?.name}</Text>
              <Text style={styles.personLocation}>{person?.place_of_birth}</Text>
            </View>
            <View style={styles.personDetailsContainer}>
              <View style={styles.personDetailItem}>
                <Text style={styles.detailTitle}>Gender</Text>
                <Text style={styles.detailText}>{
                  person?.gender == 1 ? 'female' : 'Male'
                }</Text>
              </View>
              <View style={styles.personDetailItem}>
                <Text style={styles.detailTitle}>BirthDay</Text>
                <Text style={styles.detailText}>{person?.birthday}</Text>
              </View>
              <View style={styles.personDetailItem}>
                <Text style={styles.detailTitle}>Known for</Text>
                <Text style={styles.detailText}>{person?.known_for_department}</Text>
              </View>
              <View style={styles.personDetailItem}>
                <Text style={styles.detailTitle}>Popularity</Text>
                <Text style={styles.detailText}>{person?.popularity?.toFixed(2)} %</Text>
              </View>
            </View>

            {/*biography */}
            <View style={styles.biographyContainer}>
              <Text style={styles.biographyTitle}>Biography</Text>
              <Text style={styles.biographyText}>
                {
                  person?.biography || 'N/A'
                }
              </Text>
            </View>

            {/*movies */}
            <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
          </View>
        )
      }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  safeArea: {
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  verticalMargin: {
    marginTop: 12,
  },
  backButton: {
    backgroundColor: 'yellow',
    borderRadius: 12,
    padding: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
  },
  imageWrapper: {
    alignItems: 'center',
    borderRadius: height * 0.36, // assuming rounded-full
    overflow: 'hidden',
    height: height * 0.36,
    width: height * 0.36,
    borderColor: '#A1A1A1',
    borderWidth: 2,
  },
  personImage: {
    height: height * 0.43,
    width: width * 0.74,
  },
  personInfoContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  personName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  personLocation: {
    fontSize: 16,
    color: '#A1A1A1',
    textAlign: 'center',
  },
  personDetailsContainer: {
    margin: 24,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    borderRadius: 24,
  },
  personDetailItem: {
    alignItems: 'center',
    borderRightColor: '#A1A1A1',
    borderRightWidth: 2,
    paddingHorizontal: 8,
  },
  detailTitle: {
    color: 'white',
    fontWeight: '600',
  },
  detailText: {
    color: '#A1A1A1',
    fontSize: 12,
  },
  biographyContainer: {
    margin: 24,
    space: 8,
  },
  biographyTitle: {
    fontSize: 18,
    color: 'white',
  },
  biographyText: {
    fontSize: 14,
    color: '#A1A1A1',
    letterSpacing: 0.5,
  },
});

export default PersonScreen;
