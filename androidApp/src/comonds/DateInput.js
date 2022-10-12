/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';

export const DateInput = prop => {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(false);
  const MyInputContainer = styled.TouchableOpacity`
    border: 1px solid #dadbdb;
    width: 49%;
    height: 80%;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;
  const MyInput = styled.Text`
    margin-left: 2px;
    width: 65%;
    color: #afaeae;
    font-size: 12px;
    ${props => props.black && 'color: black'}
  `;
  return (
    <>
      <MyInputContainer onPress={() => setOpen(true)}>
        {text ? (
          <MyInput black>{date.toString()}</MyInput>
        ) : (
          <MyInput>{prop.type}</MyInput>
        )}
        <Icon name="event" size={20} color={'#6A6969'} />
      </MyInputContainer>
      <DatePicker
        title={'Seleccioná la fecha'}
        mode={'datetime'}
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          prop.fn(date);
          setText(true);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
