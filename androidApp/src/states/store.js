import {configureStore} from '@reduxjs/toolkit';
import ConsultaReducer from './consulta';
import GeoDetailReducer from './geoDetail';
// import logger from 'redux-logger';
import LoginReducer from './user';
import ZonaSeguraReducer from './zonaSegura';

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  reducer: {
    user: LoginReducer,
    consulta: ConsultaReducer,
    geoDitail: GeoDetailReducer,
    zonaSegura: ZonaSeguraReducer,
  },
});

export default store;
