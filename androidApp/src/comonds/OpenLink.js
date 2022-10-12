import React, {useCallback} from 'react';
import {Linking, Alert, TouchableOpacity, Text, StyleSheet} from 'react-native';

export const OpenLink = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.texto}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  texto: {
    color: 'blue',
    fontSize: 11,
    marginTop: 2.5,
  },
});
