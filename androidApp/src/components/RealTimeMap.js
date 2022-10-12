import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Image} from 'react-native';
import marcador from '../asset/position.png';
import {dateConverter} from '../states/utils';

const RealTimeMap = props => {
  const {marker, center, config} = props;
  console.log('marcador', marker, 'centrar', center);
  return (
    <MapView
      zoomEnabled={config ? config.zoomEnabled : true}
      rotateEnabled={config ? config.rotateEnabled : true}
      scrollEnabled={config ? config.scrollEnabled : true}
      pitchEnabled={config ? config.pitchEnabled : true}
      style={styles.map}
      region={center}>
      {marker !== [] ? (
        marker.map(
          (
            {unidad, fecha, coordenada_x, coordenada_y, status, velocidad},
            i,
          ) => (
            <Marker
              key={i}
              coordinate={{
                latitude: Number(coordenada_x),
                longitude: Number(coordenada_y),
              }}
              title={`${unidad} ${dateConverter(fecha)} hs.`}
              description={`Estado: ${
                status ? 'Encendido' : 'Apagado'
              } ${velocidad}`}>
              <Image
                source={marcador}
                style={
                  config.styleIcon === 'punto' ? styles.punto : styles.marcador
                }
              />
            </Marker>
          ),
        )
      ) : (
        <></>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  marcador: {
    width: 50,
    height: 50,
  },
  punto: {
    width: 15,
    height: 15,
  },
});

export default RealTimeMap;
