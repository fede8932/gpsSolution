import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Box} from 'native-base';
import AppMenu from '../components/AppMenu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import slogan from '../asset/sloganColor.png';

const MenuSuperior = () => {
  return (
    <Box
      bg="darkBlue.900"
      h={'4.8%'}
      flexDirection="row"
      justifyContent={'space-between'}>
      <AppMenu />
      <Image source={slogan} style={styles.slogan} />
      <Box flexDirection={'row'} marginTop={1}>
        <Icon
          name="notifications"
          size={22}
          color="#be185d"
          style={styles.icon}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  slogan: {
    marginTop: 7,
    marginLeft: 10,
    width: 110,
    height: 15,
  },
});

export default MenuSuperior;
