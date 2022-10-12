import React, {useState} from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {editZonaSegura} from '../states/zonaSegura';

const ZoneView = props => {
  const {center, config, fun} = props;
  const [coordenadas, setCoordenadas] = useState(null);
  const [number, onChangeNumber] = React.useState(null);
  const [inst, setInst] = React.useState(false);
  const dispatch = useDispatch();
  const configClick = () => {
    dispatch(
      editZonaSegura({
        centro: `${coordenadas.latitude}, ${coordenadas.longitude}`,
        radio: number,
        id: 1,
      }),
    );
    fun(false);
  };
  return (
    <View>
      {inst ? (
        <Callout style={styles.titleCallout}>
          <View style={styles.instruccion}>
            {!coordenadas ? (
              <Image
                style={styles.logo}
                source={require('../asset/icon/baseline_touch_app_black_24dp.png')}
              />
            ) : (
              <Image
                style={styles.logo}
                source={require('../asset/icon/baseline_keyboard_black_24dp.png')}
              />
            )}
            <Text style={styles.messege}>
              {!coordenadas
                ? 'Seleccioná el centro de tu zona segura!'
                : 'Ingresá el radio de tu zona segura!'}
            </Text>
          </View>
        </Callout>
      ) : (
        <></>
      )}
      <Callout style={styles.buttonCallout}>
        {coordenadas ? (
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Radio (KM)"
            keyboardType="numeric"
          />
        ) : (
          <></>
        )}
        {number ? (
          <Pressable style={styles.buttonSave} onPress={configClick}>
            <Text style={styles.texto}>Confirmar</Text>
          </Pressable>
        ) : (
          <></>
        )}
      </Callout>
      <MapView
        onMapReady={() => setInst(true)}
        onPress={e => {
          setCoordenadas({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
        zoomEnabled={config ? config.zoomEnabled : true}
        rotateEnabled={config ? config.rotateEnabled : true}
        scrollEnabled={config ? config.scrollEnabled : true}
        pitchEnabled={config ? config.pitchEnabled : true}
        style={styles.map}
        region={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}>
        {coordenadas ? (
          <Marker
            coordinate={{
              latitude: coordenadas.latitude,
              longitude: coordenadas.longitude,
            }}
            title="Centro de tu zona segura"
          />
        ) : (
          <></>
        )}
        {number ? (
          <Circle
            center={coordenadas}
            radius={number * 1000}
            strokeWidth={1.5}
            strokeColor="#3EB46F"
            fillColor="rgba(146, 248, 188, 0.4)"
          />
        ) : (
          <></>
        )}
      </MapView>
    </View>
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
  buttonCallout: {
    width: '50%',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderRadius: 20,
    zIndex: 25,
  },
  titleCallout: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderRadius: 20,
    zIndex: 25,
  },
  buttonSave: {
    backgroundColor: 'rgba(146, 248, 188, 0.4)',
    borderColor: 'rgba(146, 248, 188, 0.9)',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  texto: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    color: 'grey',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  instruccion: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 6,
    borderColor: 'rgba(132, 21, 132, 0.6)',
    borderWidth: 1,
    height: 45,
    backgroundColor: 'rgba(132, 21, 132, 0.3)',
  },
  logo: {
    width: 20,
    height: 20,
    left: 10,
  },
  messege: {
    color: 'rgba(0, 0, 0, 0.7)',
    left: 16,
  },
});

export default ZoneView;
