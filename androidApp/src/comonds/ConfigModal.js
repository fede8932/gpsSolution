import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Pressable, View} from 'react-native';
import {Button} from 'react-native-paper';
import ConfigMaps from '../components/ConfigMaps';
import Geolocation from 'react-native-geolocation-service';

const ConfigModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('No se han guardado los cambios!');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.mapContainer}>
              <ConfigMaps fun={setModalVisible} center={location} />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.buttonOpen]}>
        <Button
          disabled={props.vehicle ? false : true}
          style={styles.buttonStyle}
          icon={require('../asset/icon/baseline_my_location_black_24dp.png')}
          onPress={() => setModalVisible(true)}>
          Configurar zona segura
        </Button>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 22,
    width: '100%',
    height: '100%',
    margin: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    minHeight: 40,
    marginTop: 40,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonStyle: {
    minWidth: '90%',
    marginLeft: '-22%',
    flexDirection: 'row',
  },
  mapContainer: {
    height: '100%',
    width: '100%',
  },
});

export default ConfigModal;
