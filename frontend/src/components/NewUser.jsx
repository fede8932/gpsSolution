import { Spinner,Container,Input,Button,FormControl,FormLabel,Select} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import newUser from '../assets/img/icon/nuevoUsuario.png'
import { useSelector } from 'react-redux';
import {altaUser} from '../states/user';
import { useNavigate } from "react-router-dom";
import provinces from '../utils/provincias';
import { useState } from 'react';
import swal from "sweetalert";
import '../styles/contenido.css'

function NewUser (){
    const [loading , setLoading] = useState(false)
    const {register,handleSubmit,formState: { errors }} = useForm();
    const user = useSelector(state=>state.user);
    const token = user.data.token
    const navigate = useNavigate();
    const registerUser =(data)=>{
        setLoading(true)
        altaUser({data,token}).then(res=>{
            if(res.error){
                swal("Los datos pertenecen a un usuario ya registrado");
                setLoading(false)
            }else{
                swal({
                    title: "Registro guardado",
                    text: "Creaste un nuevo usuario",
                    icon: "success",
                    button: "Aceptar",
                });
                navigate('/')
            }
        })
    }
    return (
            <Container id='contenedor'>
                <form onSubmit={handleSubmit(registerUser)} className='newUserForm'>
                    <div>
                        <img style={{width:'10rem',margin:'auto'}} src={newUser} alt="" />
                    </div>
                    <h1 style={{fontSize:'2rem',margin:'0.5rem'}}>Agregar usuario</h1>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='text'>Nombre y apellido</FormLabel>
                        <Input placeholder='Nombre completo' id='name' type='text' 
                        {...register("name", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.name && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.name.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='email'>Dirección E-mail</FormLabel>
                        <Input placeholder='Email' id='email' type='text' 
                        {...register("email", {
                        required: {
                        value: true,
                        message: "*Campo obligatorio"},
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "El formato no es correcto"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                        {errors.email && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.email.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='text'>Incio de contrato</FormLabel>
                        <Input id='fechaInico' type='date'
                        {...register("initDate", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.initDate && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.initDate.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='number'>CUIT (Solo números)</FormLabel>
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
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='text'>Contraseña (Min. 8 dígitos)</FormLabel>
                        <Input placeholder='Contraseña' id='pass' type='password' 
                        {...register("pass", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"},
                            pattern: {
                            value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$$/,
                            message: "Al menos una minuscula y una mayuscula"}})}/>
                            <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.pass && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.pass.message}</span>}
                            </div>
                    </FormControl>
                    </div>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='text'>Calle</FormLabel>
                        <Input placeholder='Nombre de la calle' id='calle' type='text' 
                        {...register("calle", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.calle && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.calle.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='number'>Número</FormLabel>
                        <Input placeholder='Altura' id='number' type='number' 
                        {...register("altura", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.altura && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.altura.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='number'>Provincia</FormLabel>
                        <Select placeholder='Select option'
                        {...register("prov", {
                        required: {
                        value: true,
                        message: "*Campo obligatorio"}})}>
                            {provinces.map((prov,i)=>(<option key={i} value={prov.name}>{prov.name}</option>))}
                        </Select>
                        <div style={{height:'0.5rem',display:'flex'}}>
                        {errors.prov && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.prov.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='text'>Localidad</FormLabel>
                        <Input placeholder='Localidad'  id='localidad' type='text' 
                        {...register("localidad", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.localidad && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.localidad.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl' style={{maxWidth:'15rem'}}>
                        <FormLabel id='formuLabel' htmlFor='text'>Código postal</FormLabel>
                        <Input placeholder='Código postal' id='cp' type='number' 
                        {...register("cp", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.cp && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.cp.message}</span>}
                        </div>
                    </FormControl>
                    {user.data.superUser?(
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='text'>Tipo de usuario</FormLabel>
                        <Select placeholder='Select option'
                        {...register("type", {
                            required: {
                            value: true,
                            message: "*Campo obligatorio"}})}>
                            <option value='cliente'>Cliente</option>
                            <option value='admin'>Administrador</option>
                        </Select>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.type && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.type.message}</span>}
                        </div>
                    </FormControl>):(<></>)}
                    </div>
                    <Button type='submit' style={{borderRadius:'40px',maxWidth:'12rem', marginTop:'2rem' , marginBottom:'2rem' , width:'100%',background: 'linear-gradient(90deg, rgba(9,121,71,0.9612219887955182) 27%, rgba(0,176,255,1) 100%)'}} colorScheme='green' variant='solid'>{loading?<Spinner />:<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Registrar</span>}</Button>
                </form>
            </Container>
    )
}

export default NewUser