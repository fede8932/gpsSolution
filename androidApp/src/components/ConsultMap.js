import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import PolylineDirection from '@react-native-maps/polyline-direction';
import {StyleSheet, Image} from 'react-native';
import marcador from '../asset/position.png';
import {dateConverter, origenDestino} from '../states/utils';

const ConsultMap = props => {
  const {line, marker, center, config} = props;
  console.log(line);
  return (
    <MapView
      zoomEnabled={config ? config.zoomEnabled : true}
      rotateEnabled={config ? config.rotateEnabled : true}
      scrollEnabled={config ? config.scrollEnabled : true}
      pitchEnabled={config ? config.pitchEnabled : true}
      style={styles.map}
      region={center}>
      {marker ? (
        marker.map(({latitude, longitude, fecha, status, velocidad}, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={`${dateConverter(fecha)} hs.`}
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
        ))
      ) : (
        <></>
      )}
      {line ? (
        origenDestino(line).map(({origen, destino}, i) => (
          <PolylineDirection
            key={i}
            origin={origen}
            destination={destino}
            apiKey={'AIzaSyAe_vv73o1xZjc8lTB0fgCac66KfKSdLtg'}
            strokeWidth={2.1}
            strokeColor="#841584"
          />
        ))
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

export default ConsultMap;
