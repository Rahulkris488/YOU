import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export function MapSection() {
  return (
    <View style={styles.mapContainer}>
      <Image
        source={require('../../assets/you-map.webp')}
        style={styles.mapImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:0,
    paddingHorizontal:1,
  },
  mapImage: {
    width: '100%',
    height: 505,
  },
});
