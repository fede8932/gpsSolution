import React from 'react';
import {Divider} from 'native-base';
import {View, StyleSheet} from 'react-native';
import ConsultMap from '../components/ConsultMap';
import FormularioConsultas from '../components/FormularioConsulta';
import InfoContainer from '../components/InfoContainer';
import {useSelector} from 'react-redux';
import {center} from '../states/utils';

const Consultas = () => {
  const device = useSelector(state => state.consulta.data.device);
  // console.log('device', device);
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {device ? (
          <ConsultMap
            line={device.reportes}
            center={center(device.reportes)}
            marker={device.reportes}
            config={{
              zoomEnabled: true,
              rotateEnabled: false,
              scrollEnabled: true,
              pitchEnabled: false,
              styleIcon: 'punto',
            }}
          />
        ) : (
          <ConsultMap />
        )}
      </View>
      <Divider />
      <FormularioConsultas />
      <InfoContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  mapContainer: {
    height: '42%',
    marginBottom: 1,
  },
});

export default Consultas;
