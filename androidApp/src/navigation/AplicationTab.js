// Dependencias
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Center} from 'native-base';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {effectLogin} from '../states/user';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Componentes
import Login from '../screen/Login';
import MenuSuperior from '../screen/MenuSuperior';
import Prueba from '../screen/Prueba';
import HomePage from '../screen/HomePage';
import Consultas from '../screen/Consultas';
import Config from '../screen/Config';

const Tab = createBottomTabNavigator();

export const AplicationTab = () => {
  const {data} = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(effectLogin())
      .then(res => {
        console.log('user ok');
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <StatusBar backgroundColor="#000e21" />
      {!data ? (
        <Center bg="darkBlue.900" h={'100%'}>
          <Login />
        </Center>
      ) : (
        <>
          <MenuSuperior />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#841584',
              tabBarInactiveTintColor: '#be185d',
            }}>
            <>
              <Tab.Screen
                options={{
                  title: 'Inicio',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="home" size={size} color={color} />
                  ),
                }}
                name="Home"
                component={HomePage}
              />
              <Tab.Screen
                options={{
                  title: 'Información',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="leaderboard" size={size} color={color} />
                  ),
                }}
                name="Prueba"
                component={Consultas}
              />
              <Tab.Screen
                options={{
                  title: 'Config',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="settings" size={size} color={color} />
                  ),
                }}
                name="Configuracion"
                component={Config}
              />
              <Tab.Screen
                options={{
                  title: 'Pagos',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="info" size={size} color={color} />
                  ),
                }}
                name="Pagar"
                component={Prueba}
              />
            </>
          </Tab.Navigator>
        </>
      )}
    </>
  );
};
