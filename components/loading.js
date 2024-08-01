import React, { useState } from 'react';
import { View, Text, Image, Dimensions, Platform, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const Loading = () => {
  return (
    <View className='absolute flex-row justify-center items-center' style={{ width, height }}>
      <Progress.CircleSnail thickness={12} size={160} color='yellow' />
    </View>
  )
}

export default Loading;