import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import DeviceReducer from "./devices";
import LoginReducer from "./user";
import ClientDetailReducer from "./clientDetail";
import GeoDetailReducer from "./geoDetail";


const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* logger */),
  reducer: {
    user : LoginReducer,
    device : DeviceReducer,
    clientDetail : ClientDetailReducer,
    geoDetail : GeoDetailReducer
  },
});

export default store;