import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const clientDetail = createAsyncThunk("CLIENT_DETAIL", async(date) => {
    const client = await axios({
        method: "POST",
        url: 'https://gps-proyect.herokuapp.com/api/admin/client',
        headers: {"Authorization": `Bearer ${date.token}`},
        data: {
          CUIT: date.CUIT,
          fullName:'',
          email:''
        },
    })
    return client.data[0]
});
const userInitialState = {
    loading:false,
    data:[],
    error:null
};


const ClientDetailReducer = createReducer(userInitialState, {
        [clientDetail.pending]: (state, action) => {
            state.loading = true
            state.data = []
            state.error = null
        },
        [clientDetail.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        },
})


export default ClientDetailReducer;