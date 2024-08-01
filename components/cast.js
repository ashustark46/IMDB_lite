import { image185 } from '@/api/moviedb';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Cast = ({ cast, navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {cast && cast.map((person, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.personContainer}
              onPress={() => navigation.navigate('Person', person)}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: image185(person?.profile_path) }}
                />
              </View>
              <Text style={styles.characterName}>
                {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
              </Text>
              <Text style={styles.personName}>
                {person?.original_name.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  personContainer: {
    marginRight: 16,
    alignItems: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 50,
    height: 80,
    width: 80,
    alignItems: 'center',
    borderColor: '#A1A1A1',
    borderWidth: 1,
  },
  image: {
    borderRadius: 10,
    height: 96,
    width: 80,
  },
  characterName: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  personName: {
    color: '#A1A1A1',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Cast;
