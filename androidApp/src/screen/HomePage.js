/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import RealTimeMap from '../components/RealTimeMap';
import {geoDetail} from '../states/geoDetail';
import {centrar} from '../states/utils';
import {useFocusEffect} from '@react-navigation/native';
import {locationPermission} from '../states/utils';

const HomePage = () => {
  const {id} = useSelector(state => state.user.data);
  const datos = useSelector(state => state.geoDitail);
  // console.log('id', id, 'datos', datos);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      locationPermission();
      if (id !== undefined) {
        console.log('ok', id);
        dispatch(geoDetail(id));
        const realSearch = setInterval(() => {
          dispatch(geoDetail(id));
        }, 60000);
        return () => clearInterval(realSearch);
      }
    }, [id]),
  );
  return (
    <View style={styles.container}>
      <RealTimeMap
        marker={datos.data}
        config={{styleIcon: 'marcador'}}
        center={
          !datos.iniciado
            ? {
                latitude: -34.64258175855394,
                longitude: -58.375853820310816,
                latitudeDelta: 2,
                longitudeDelta: 2,
              }
            : centrar(datos.data)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
export default HomePage;
