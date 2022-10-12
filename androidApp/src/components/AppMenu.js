import React, {useState} from 'react';

import {StyleSheet, Text} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {removeItemValue} from '../states/user';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {effectLogin} from '../states/user';

const AppMenu = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const logOut = async () => {
    await removeItemValue('user');
    dispatch(effectLogin());
  };

  return (
    <Menu
      style={styles.menu}
      visible={visible}
      anchor={
        <Text style={styles.textMenu} onPress={showMenu}>
          <Icon name="menu" size={28} color="#be185d" />
        </Text>
      }
      onRequestClose={hideMenu}>
      <MenuItem onPress={hideMenu} style={styles.menuItem}>
        <Icon name="person" size={10} color="#be185d" />
        <Text> Mi cuenta</Text>
      </MenuItem>
      <MenuItem onPress={hideMenu} style={styles.menuItem}>
        <Icon name="dvr" size={10} color="#be185d" />
        <Text> Servicio</Text>
      </MenuItem>
      <MenuItem disabled>
        <Icon name="help" size={10} color="#be185d" />
        <Text> Ayuda</Text>
      </MenuItem>
      <MenuDivider />
      <MenuItem onPress={logOut} style={styles.menuItem}>
        <Icon name="logout" size={10} color="#be185d" />
        <Text> LogOut</Text>
      </MenuItem>
    </Menu>
  );
};

const styles = StyleSheet.create({
  textMenu: {
    marginLeft: 7,
  },
  menu: {
    width: '32%',
  },
  menuItem: {
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

export default AppMenu;
