import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const searchDevice = createAsyncThunk("SEARCH_DEVICE", async(date) => {
    let headers = {
        "Authorization": `Bearer ${date.token}`
    };

    const devices = await axios({
        method: "GET",
        url: "https://gps-proyect.herokuapp.com/api/admin/devices/true/",
        headers: headers,
    })
    return devices.data
});

const userInitialState = {
    loading:false,
    data:[{imei: 'Cargando'}],
    error:null
};

const DeviceReducer = createReducer(userInitialState, {
        [searchDevice.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        },
})


export default DeviceReducer;