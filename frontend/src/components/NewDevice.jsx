import { Spinner,Container,Input,Button,FormControl,FormLabel} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import newDevice from '../assets/img/icon/device2.webp'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import swal from "sweetalert";
import axios from 'axios';

function NewDevice (){
    const [loading , setLoading] = useState(false)
    const {register,handleSubmit,formState: { errors }} = useForm();
    const user = useSelector(state=>state.user);
    const token = user.data.token
    const navigate = useNavigate();
    const registerUser =(data)=>{
        let headers = {
            "Authorization": `Bearer ${token}`
        };
        setLoading(true)
        axios({
            method: "POST",
            url: "https://gps-proyect.herokuapp.com/api/admin/add/device",
            headers: headers,
            data:{
                imei: data.imei,
                marca: data.marca,
                model: data.modelo,
            },
        })
        .then(res=>{
                swal({
                    title: "Registro guardado",
                    text: "Añadiste un dispositivo",
                    icon: "success",
                    button: "Aceptar",
                });
                navigate('/')
        }
        )
    }
    return (
            <Container id='contenedor'>
                <form onSubmit={handleSubmit(registerUser)} className='newDeviceForm'>
                    <div>
                        <img style={{width:'11rem',margin:'auto'}} src={newDevice} alt="" />
                    </div>
                    <h1 style={{fontSize:'2rem',margin:'0.5rem'}}>Agregar dispositivo</h1>
                    <div style={{display:'flex'}}>
                    <FormControl style={{margin:'1rem'}}>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='text'>Marca</FormLabel>
                        <Input placeholder='Marca' id='name' type='text' 
                        {...register("marca", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.marca && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.marca.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <div style={{display:'flex'}}>
                    <FormControl style={{margin:'1rem'}}>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='email'>Modelo</FormLabel>
                        <Input placeholder='Modelo' id='email' type='text' 
                        {...register("modelo", {
                        required: {
                        value: true,
                        message: "*Campo obligatorio"},})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                        {errors.modelo && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.modelo.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <div style={{display:'flex'}}>
                    <FormControl style={{margin:'1rem'}}>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='text'>IMEI</FormLabel>
                        <Input placeholder='IMEI' id='name' type='text' 
                        {...register("imei", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.imei && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.imei.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <Button type='submit' style={{borderRadius:'40px',maxWidth:'12rem', marginTop:'2rem' , marginBottom:'2rem' , width:'100%',background: 'linear-gradient(90deg, rgba(9,121,71,0.9612219887955182) 27%, rgba(0,176,255,1) 100%)'}} colorScheme='green' variant='solid'>{loading?<Spinner />:<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Registrar</span>}</Button>
                </form>
            </Container>
    )
}

export default NewDevice