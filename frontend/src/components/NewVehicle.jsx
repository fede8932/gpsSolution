import { Spinner,Container,Input,Button,FormControl,FormLabel,Select} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import newVehicle from '../assets/img/icon/vehiculo.webp'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import swal from "sweetalert";
import axios from 'axios';

function NewVehicle (){
    const devices = useSelector(state=>state.device.data)
    const [loading , setLoading] = useState(false)
    const {register,handleSubmit,formState: { errors }} = useForm();
    const user = useSelector(state=>state.user);
    const token = user.data.token
    const navigate = useNavigate();
    const registerVehicle =(data)=>{
        let headers = {
            "Authorization": `Bearer ${token}`
        };
        setLoading(true)
        axios({
            method: "POST",
            url: "https://gps-proyect.herokuapp.com/api/admin/add/vehiculo",
            headers: headers,
            data:{
                cuit:data.cuit,
                marca:data.marca,
                modelo:data.modelo,
                año:data.year,
                patente:data.patente,
                color:data.color,
                imei:data.device,
                chasis:data.chasis,
                motor:data.motor,
                token:token
            },
        })
        .then(res=>{
            swal({
                title: "Registro guardado",
                text: "Agregaste un nuevo vehiculo",
                icon: "success",
                button: "Aceptar",
            });
            navigate('/')
        })
        .catch((err)=>{
            setLoading(false)
            swal({
                title: "Error",
                text: err.response.data,
                icon: "error",
                button: "Aceptar",
            });
            navigate('/')
        })
    }
    return (
            <Container id='contenedor'>
                <form onSubmit={handleSubmit(registerVehicle)} className='newUserForm'>
                    <div>
                        <img style={{width:'11rem',margin:'auto'}} src={newVehicle} alt="" />
                    </div>
                    <h1 style={{fontSize:'2rem',margin:'0.5rem'}}>Agregar vehiculo</h1>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='text'>Marca</FormLabel>
                        <Input placeholder='Ejemplo: Volkswagen' id='name' type='text' 
                        {...register("marca", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.marca && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.marca.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='email'>Modelo</FormLabel>
                        <Input placeholder='Ejemplo: T-Cross' id='email' type='text' 
                        {...register("modelo", {
                        required: {
                        value: true,
                        message: "*Campo obligatorio"},})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                        {errors.modelo && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.modelo.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl style={{margin:'1rem',maxWidth:'10rem'}}>
                        <FormLabel id='formuLabel' htmlFor='email'>Color</FormLabel>
                        <Input placeholder='Ejemplo: Rojo' id='email' type='text' 
                        {...register("color", {
                        required: {
                        value: true,
                        message: "*Campo obligatorio"},})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                        {errors.color && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.color.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <div className='inputContainer'>
                    <FormControl style={{margin:'1rem',maxWidth:'11rem'}}>
                        <FormLabel id='formuLabel' htmlFor='text'>Patente</FormLabel>
                        <Input placeholder='AA999ZZ / ZZZ999' id='calle' type='text' 
                        {...register("patente", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.patente && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.patente.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='number'>Chasis</FormLabel>
                        <Input placeholder='Número de chasis' id='number' type='text' 
                        {...register("chasis", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.chasis && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.chasis.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl style={{margin:'1rem',maxWidth:'25rem'}}>
                        <FormLabel id='formuLabel' htmlFor='text'>Motor</FormLabel>
                        <Input placeholder='Número de motor'  id='localidad' type='text' 
                        {...register("motor", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.motor && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.motor.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='number'>CUIT titular (Solo números)</FormLabel>
                        <Input placeholder='99-99999999-9' id='cuit' type='number' 
                        {...register("cuit", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"},
                            pattern: {
                            value: /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g,
                            message: "El formato no es correcto"}})}/>
                            <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.cuit && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.cuit.message}</span>}
                            </div>
                    </FormControl>
                    <FormControl style={{margin:'1rem',minWidth:'20rem'}}>
                        <FormLabel id='formuLabel' htmlFor='number'>Dispositivo</FormLabel>
                        <Select placeholder='Select option'
                        {...register("device", {
                        required: {
                        value: true,
                        message: "*Campo obligatorio"}})}>
                            {devices.map((device,i)=>(<option key={i} value={device.imei}>{device.imei}</option>))}
                        </Select>
                        <div style={{height:'0.5rem',display:'flex'}}>
                        {errors.prov && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.prov.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl style={{margin:'1rem',maxWidth:'15rem'}}>
                        <FormLabel id='formuLabel' htmlFor='text'>Año</FormLabel>
                        <Input placeholder='Ejemplo: 2018' id='cp' type='number' 
                        {...register("year", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.year && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.year.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <Button type='submit' style={{borderRadius:'40px',maxWidth:'12rem', marginTop:'2rem' , marginBottom:'2rem' , width:'100%',background: 'linear-gradient(90deg, rgba(9,121,71,0.9612219887955182) 27%, rgba(0,176,255,1) 100%)'}} colorScheme='green' variant='solid'>{loading?<Spinner />:<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Registrar</span>}</Button>
                </form>
            </Container>
    )
}

export default NewVehicle