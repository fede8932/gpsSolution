import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const setUser = createAsyncThunk("SET_USER", async(date) => {
    const user = await axios({
        method: "POST",
        url: "https://gps-proyect.herokuapp.com/api/auth/login",
        data: {
          email: date.email,
          pass: date.pass,
        },
    })
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user.data));
    return user.data
});
export const effectLogin = createAsyncThunk("PERSISTENCIA", async () => {
    // const usuario = JSON.parse(localStorage.getItem('user'))
    // const user = await axios({
    //     method: "POST",
    //     url: "https://gps-proyect.herokuapp.com/api/auth/me",
    //     headers: {
    //         "Authorization": `Bearer ${usuario.token}`
    //     },
    //     data:{},
    // })
    //si los usuarios son iguales, retornar el user de localstorage.
    return JSON.parse(localStorage.getItem('user'));
});
export const altaUser = async(dataUser) => {
    const admin = dataUser.data.type === 'admin'?true:false
    let headers = {
            "Authorization": `Bearer ${dataUser.token}`
     };
    try{
        const user = await axios({
            method: "POST",
            url: "https://gps-proyect.herokuapp.com/api/auth/register",
            headers: headers,
            data:{
                fullName:dataUser.data.name,
                CUIT:dataUser.data.cuit,
                email:dataUser.data.email,
                address:`${dataUser.data.calle}, ${dataUser.data.altura}, ${dataUser.data.localidad}, C.P:${dataUser.data.cp}, ${dataUser.data.prov}`,
                password:dataUser.data.pass,
                initDate:dataUser.data.initDate,
                isAdmin:admin,
            },
        })
        return {data:user ,error:false};
    }catch (err){
        return {data:err ,error:true};
    }
};

const userInitialState = {
    loading:false,
    data:{},
    error:null
};

const LoginReducer = createReducer(userInitialState, {
        [setUser.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [setUser.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        },
        [setUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [effectLogin.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        },
        [effectLogin.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
})


export default LoginReducer;