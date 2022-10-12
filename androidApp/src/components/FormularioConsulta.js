import React from 'react';
import {Select, Center, Box, CheckIcon, View} from 'native-base';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {DateInput} from '../comonds/DateInput';
import styled from 'styled-components/native';
import {inicioVerify, finalVerify, vehicleVerify} from '../states/utils';
import {useSelector, useDispatch} from 'react-redux';
import {setConsulta} from '../states/consulta';
import {Loading} from '../comonds/Loading';

const MyTextButton = styled.Text`
  color: #ffffff;
`;

const FormularioConsultas = () => {
  let [vehicle, setVehicle] = React.useState('');
  let [inicio, setInicio] = React.useState(undefined);
  let [final, setFinal] = React.useState(undefined);
  let [error, setError] = React.useState(undefined);
  const {id, token, unidades} = useSelector(state => state.user.data);
  const consulta = useSelector(state => state.consulta);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      setError(undefined);
      inicioVerify(inicio, final);
      finalVerify(inicio, final);
      vehicleVerify(vehicle);
      await dispatch(
        setConsulta({
          userId: id,
          inicio: inicio,
          final: final,
          vehicle: vehicle,
          token: token,
        }),
      );
    } catch (e) {
      setError(e.message);
    }
  };
  console.log('inicio', inicio, 'final', final);

  return (
    <Center style={styles.container}>
      <Box style={styles.dateContainer} w="5/6">
        <DateInput type={'Inicio'} fn={setInicio} />
        <DateInput type={'Final'} fn={setFinal} />
      </Box>
      <Box w="5/6" h="10" style={styles.vehicleContainer}>
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
        <TouchableOpacity onPress={handleClick} style={styles.buttonStyle}>
          {consulta.loading ? (
            <Loading color="#ffffff" />
          ) : (
            <MyTextButton style={styles.textButton}>Consultar</MyTextButton>
          )}
        </TouchableOpacity>
      </Box>
      <View style={styles.errorContainer}>
        <Text style={error ? styles.errorTrue : styles.errorFalse}>
          {error}
        </Text>
      </View>
    </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  mapContainer: {
    height: '42%',
    marginBottom: 1,
  },
  dateContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
  vehicleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyle: {
    display: 'flex',
    minWidth: '23%',
    minHeight: '78%',
    backgroundColor: '#841584',
    marginTop: '2.8%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  errorContainer: {
    minHeight: 27,
    display: 'flex',
    justifyContent: 'center',
  },
  errorTrue: {
    color: 'red',
  },
  errorFalse: {
    color: '#ffffff',
  },
});

export default FormularioConsultas;
