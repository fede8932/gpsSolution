import {createReducer, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getZonaSegura = createAsyncThunk('GET_ZONA_SEGURA', async date => {
  const reporte = await axios({
    method: 'GET',
    url: `https://gps-proyect.herokuapp.com/api/user/zone/${date.vehicle}`,
    // headers: {Authorization: `Bearer ${date.token}`},
  });
  return reporte.data;
});
export const editZonaSegura = createAsyncThunk(
  'EDIT_ZONA_SEGURA',
  async date => {
    const reporte = await axios({
      method: 'PUT',
      url: `https://gps-proyect.herokuapp.com/api/user/zone/${date.id}`,
      // headers: {Authorization: `Bearer ${date.token}`},
      data: {
        centro: date.centro,
        radio: date.radio,
      },
    });
    return reporte.data;
  },
);

const userInitialState = {
  loading: false,
  data: null,
  error: null,
};

const ZonaSeguraReducer = createReducer(userInitialState, {
  [getZonaSegura.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [getZonaSegura.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.error = null;
  },
  [getZonaSegura.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  },
  [editZonaSegura.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [editZonaSegura.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.error = null;
  },
  [editZonaSegura.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  },
});

export default ZonaSeguraReducer;
