/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner,Container,Input,Button,FormControl,FormLabel} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import swal from "sweetalert";
import Mapa from './Mapa';
import { clientDetail } from '../states/clientDetail';
import { geoDetail } from '../states/geoDetail';
import "../styles/contenido.css";
import { useState } from 'react';
import { useEffect } from 'react';

function Home (){
    const dispatch = useDispatch()
    const [active , setActive] = useState({id:null , status:false})
    const {register,handleSubmit,formState: { errors }} = useForm();
    const user = useSelector(state=>state.user);
    const client = useSelector(state=>state.clientDetail);
    const clientSearch =(data)=>{
        data.token=user.data.token
        dispatch(clientDetail(data))
        .then(res=>{
            if(!res.payload){
                swal({
                    title: "Error",
                    text: "No se encontraron resultados",
                    icon: "error",
                    button: "Atras",
                });
            }else{
                console.log(res.payload.id)
                dispatch(geoDetail(res.payload.id))
                setActive({id:res.payload.id , status:true})
            }
        })
    }
    useEffect(()=>{
        if(active.id!==null){
            console.log(active)
            setInterval(()=>{dispatch(geoDetail(active.id))}, 60000)}},[active.status]);
    return (
            <Container id='contenedor'>
                <form onSubmit={handleSubmit(clientSearch)} id='formulario'>
                    <h1 style={{fontSize:'2rem',margin:'0.2rem'}}>Inicio</h1>
                    <div style={{display:'flex'}}>
                    <FormControl style={{margin:'0.5rem'}}>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='number'>CUIT (Solo números)</FormLabel>
                        <Input placeholder='99-99999999-9' id='cuit' type='number' 
                        {...register("CUIT", {
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
                    <Button type='submit' style={{borderRadius:'40px',maxWidth:'12rem', marginTop:'1.85rem' , marginBottom:'2rem' , width:'100%',background: 'linear-gradient(90deg, rgba(9,121,71,0.9612219887955182) 27%, rgba(0,176,255,1) 100%)'}} colorScheme='green' variant='solid'>{client.loading?<Spinner />:<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Buscar</span>}</Button>
                    </div>
                </form>
                <div id='mapDetailContainer'>
                    <div id='mapContainer'>
                        <Mapa/>
                    </div>
                </div>
            </Container>
    )
}

export default Home