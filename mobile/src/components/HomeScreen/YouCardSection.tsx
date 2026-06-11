import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Share, ImageSourcePropType } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface YouCardSectionProps {
  /** Image source for the YOU card — will be dynamic */
  cardImage?: ImageSourcePropType;
  /** The URL/data encoded in the QR code — will be dynamic */
  qrValue?: string;
  /** Label for the share button */
  shareLabel?: string;
  onShare?: () => void;
}

export function YouCardSection({
  cardImage = require('../../assets/dummy-you-card.png'),
  qrValue = 'https://you-app.com/card/001',
  shareLabel = 'TAP TO SHARE',
  onShare,
}: YouCardSectionProps): React.JSX.Element {

  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }
    try {
      await Share.share({
        message: `Check out my YOU Card! ${qrValue}`,
        url: qrValue,
      });
    } catch (e) {
      // silently fail
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        {/* YOU Card Image Wrapper with Shadow */}
        <View style={styles.cardShadowWrapper}>
          <View style={styles.cardContainer}>
            <Image
              source={cardImage}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* QR Code + Share Button */}
        <Pressable style={styles.qrSection} onPress={handleShare}>
          <View style={styles.qrContainer}>
            <QRCode
              value={qrValue}
              size={72}
              color="#1A1C1E"
              backgroundColor="transparent"
            />
          </View>
          <Text style={styles.shareText}>{shareLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 58,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#1A1C1E',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardShadowWrapper: {
    flex: 1,
    aspectRatio: 1672 / 941,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  qrSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    fontFamily: 'Chillax-Semibold',
    fontSize: 8,

    color: '#000000ff',
  },
});
