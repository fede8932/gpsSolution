import React from 'react';
import styled from 'styled-components/native';
import {Text, StyleSheet, View} from 'react-native';
import {Divider} from 'native-base';
import {OpenLink} from '../comonds/OpenLink';
import {useSelector} from 'react-redux';
import {Esqueleto} from '../comonds/Esqueleto';
import {velMax, velMed} from '../states/utils';

const MyViewContainer = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
`;
const MyView = styled.View`
  width: 83.333%;
  height: 35%;
`;

const InfoContainer = () => {
  const consulta = useSelector(state => state.consulta);
  console.log('consulta', consulta);
  return (
    <MyViewContainer>
      {consulta.loading ? (
        <Esqueleto />
      ) : (
        <MyView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Informe</Text>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <View style={styles.inLine}>
              <Text style={styles.subTitle}>
                Vehiculo: <Text style={styles.text}>Automovil</Text>
              </Text>
            </View>
            <View style={styles.inLine}>
              <Text style={styles.subTitle}>
                Dominio:{' '}
                <Text style={styles.text}>{consulta.data.patente}</Text>
              </Text>
              <Text style={styles.subTitle}>
                Marca: <Text style={styles.text}>{consulta.data.marca}</Text>
              </Text>
            </View>
            <View style={styles.inLine}>
              <Text style={styles.subTitle}>
                Modelo: <Text style={styles.text}>{consulta.data.modelo}</Text>
              </Text>
              <Text style={styles.subTitle}>
                Chasis: <Text style={styles.text}>{consulta.data.chasis}</Text>
              </Text>
            </View>
            <View style={styles.inLine}>
              <Text style={styles.subTitle}>
                Vel. media:{' '}
                <Text style={styles.text}>
                  {consulta.data.device
                    ? velMed(consulta.data.device.reportes)
                    : ''}
                </Text>
              </Text>
              <Text style={styles.subTitle}>
                Vel. Máxima:{' '}
                <Text style={styles.text}>
                  {consulta.data.device
                    ? velMax(consulta.data.device.reportes)
                    : ''}
                </Text>
              </Text>
            </View>
            <View style={styles.inLine}>
              <Text style={styles.subTitle}>Kilometros recorridos:</Text>
            </View>
            <View style={styles.inLine}>
              <Text style={styles.subTitle}>Origen:</Text>
              <OpenLink url={'https://goo.gl/maps/Q9gqvGJa4MdEmF8bA'}>
                -34.516429568983234, -58.7732840583893
              </OpenLink>
            </View>
          </View>
        </MyView>
      )}
    </MyViewContainer>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 7,
  },
  title: {
    fontSize: 16,
    color: '#3C3D3D',
  },
  infoContainer: {
    margin: 7,
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  subTitle: {
    fontSize: 13.5,
    color: '#5C5C5C',
  },
  inLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: '#8B8C8C',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default InfoContainer;
