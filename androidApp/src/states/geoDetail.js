import {createReducer, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const geoDetail = createAsyncThunk('GEO_DETAIL', async id => {
  const geopos = await axios({
    method: 'GET',
    url: `https://gps-proyect.herokuapp.com/api/user/status/${id}`,
  });
  return geopos.data;
});
const userInitialState = {
  loading: false,
  data: [],
  error: null,
  iniciado: false,
};

const GeoDetailReducer = createReducer(userInitialState, {
  // [geoDetail.pending]: (state, action) => {
  //   state.loading = true;
  //   state.data = [];
  //   state.error = null;
  // },
  [geoDetail.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.error = null;
    state.iniciado = true;
  },
});

export default GeoDetailReducer;
