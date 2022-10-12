import {createReducer, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const setConsulta = createAsyncThunk('SET_CONSULTA', async date => {
  const reporte = await axios({
    method: 'POST',
    url: `https://gps-proyect.herokuapp.com/api/user/search/${date.userId}/${date.vehicle}`,
    headers: {Authorization: `Bearer ${date.token}`},
    data: {
      init: date.inicio,
      end: date.final,
    },
  });
  return reporte.data;
});

const userInitialState = {
  loading: false,
  data: {},
  error: null,
};

const ConsultaReducer = createReducer(userInitialState, {
  [setConsulta.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [setConsulta.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.error = null;
  },
  [setConsulta.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  },
});

export default ConsultaReducer;
