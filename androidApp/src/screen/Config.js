/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {List, Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Select, Box, CheckIcon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import ConfigModal from '../comonds/ConfigModal';
import {getZonaSegura} from '../states/zonaSegura';

const Config = () => {
  let [vehicle, setVehicle] = useState(null);
  const {unidades} = useSelector(state => state.user.data);
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  console.log('Config.js vehiculo', vehicle);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getZonaSegura({vehicle: vehicle}));
  }, [vehicle]);
  return (
    <Box>
      <Box style={styles.boxContainer}>
        <Select
          selectedValue={vehicle}
          minWidth="69%"
          accessibilityLabel="Vehiculo"
          placeholder="Vehiculo"
          _selectedItem={{
            bg: '#841584',
            endIcon: <CheckIcon size="5" color="#ffffff" />,
          }}
          mt={1}
          onValueChange={itemValue => setVehicle(itemValue)}>
          {unidades.map(unidad => (
            <Select.Item
              key={unidad.id}
              label={`${unidad.patente} ${unidad.marca} ${unidad.modelo}`}
              value={unidad.patente}
            />
          ))}
        </Select>
      </Box>
      <List.Section title="Configuración de servicio">
        <List.Accordion
          style={styles.listItem}
          title="Mantenimiento"
          left={props => (
            <List.Icon
              {...props}
              icon={require('../asset/icon/baseline_build_black_24dp.png')}
            />
          )}>
          <Box style={styles.boxOptionsContainer}>
            <Button
              disabled={vehicle ? false : true}
              style={styles.buttonStyle}
              icon={require('../asset/icon/baseline_event_black_24dp.png')}
              onPress={() => console.log('Pressed')}>
              Calendario de servicios
            </Button>
            <Button
              disabled={vehicle ? false : true}
              style={styles.buttonStyle}
              icon={require('../asset/icon/baseline_dashboard_black_24dp.png')}
              onPress={() => console.log('Pressed')}>
              Otra cosa
            </Button>
          </Box>
        </List.Accordion>

        <List.Accordion
          style={styles.listItem}
          title="Zona segura"
          left={props => (
            <List.Icon
              {...props}
              icon={require('../asset/icon/baseline_verified_user_black_24dp.png')}
            />
          )}
          expanded={expanded}
          onPress={handlePress}>
          <Box style={styles.boxOptionsContainer}>
            <ConfigModal vehicle={vehicle} />
          </Box>
        </List.Accordion>
      </List.Section>
    </Box>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
  },
  listItem: {
    backgroundColor: '#ECE8E7',
  },
  boxOptionsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonStyle: {
    minWidth: '90%',
    marginLeft: '-22%',
    flexDirection: 'row',
  },
});

export default Config;
