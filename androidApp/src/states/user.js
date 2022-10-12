import {createReducer, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, obj) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    console.log('muestro error', error);
  }
};
const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error);
  }
};
export const removeItemValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

export const setUser = createAsyncThunk('SET_USER', async date => {
  const user = await axios({
    method: 'POST',
    url: 'https://gps-proyect.herokuapp.com/api/auth/login',
    data: {
      email: date.email.toLowerCase(),
      pass: date.pass,
    },
  });
  await storeData('user', user.data);
  return user.data;
});
export const effectLogin = createAsyncThunk('PERSISTENCIA', async () => {
  return await retrieveData('user');
});

const userInitialState = {
  loading: false,
  data: {},
  error: null,
};

const LoginReducer = createReducer(userInitialState, {
  [setUser.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [setUser.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.error = null;
  },
  [setUser.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  },
  [effectLogin.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.error = null;
  },
  [effectLogin.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  },
});

export default LoginReducer;
