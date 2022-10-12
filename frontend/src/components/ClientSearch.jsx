import { Spinner,Container,Input,Button,TableContainer,FormControl,FormLabel,Table,Thead,Tr,Th,Tbody,Td} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form";
import newUser from '../assets/img/icon/buscarCliente.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import swal from "sweetalert";
import axios from 'axios';
import { clientDetail } from '../states/clientDetail';

function ClientSearch (){
    const user = useSelector(state=>state.user);
    const [loading , setLoading] = useState({client:[],estado:false})
    const {register,handleSubmit,formState: { errors }} = useForm();
    const token = user.data.token
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleDetail = (cuit)=>{
        dispatch(clientDetail({CUIT:cuit , token:token}))
        .then(()=>{navigate('/singleuser')})
        .catch(err=>console.log(err))
    }
    const clientSearch =(data)=>{
        setLoading({client:[],estado:true})
        data.token = token
        axios({
            method: 'post',
            headers: {"Authorization": `Bearer ${token}`},
            url: 'https://gps-proyect.herokuapp.com/api/admin/client',
            data: data
          })
        .then(res=>{
            setLoading({client:res.data,estado:false})
        })
        .catch(err=>{
            setLoading({client:[],estado:false})
            swal({
                title: "Error",
                text: "No se encontraron resultados",
                icon: "error",
                button: "Atras",
            });
        })
    }
    return (
            <Container id='contenedor'>
                <form onSubmit={handleSubmit(clientSearch)} className='newUserForm'>
                    <div>
                        <img style={{width:'10rem',margin:'auto'}} src={newUser} alt="" />
                    </div>
                    <h1 style={{fontSize:'2rem',margin:'0.5rem'}}>Buscar cliente</h1>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='text'>Nombre y apellido</FormLabel>
                        <Input placeholder='Nombre completo' id='name' type='text' 
                        {...register("fullName")}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.name && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.name.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='email'>Dirección E-mail</FormLabel>
                        <Input placeholder='Email' id='email' type='text' 
                        {...register("email", {})}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                        {errors.email && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.email.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel id='formuLabel' htmlFor='number'>CUIT (Solo números)</FormLabel>
                        <Input placeholder='99-99999999-9' id='cuit' type='number' 
                        {...register("CUIT", {
                            pattern: {
                            value: /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g,
                            message: "El formato no es correcto"}})}/>
                            <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.CUIT && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.CUIT.message}</span>}
                            </div>
                    </FormControl>
                    </div>
                    <Button type='submit' style={{borderRadius:'40px',maxWidth:'12rem', marginTop:'2rem' , marginBottom:'1rem' , width:'100%',background: 'linear-gradient(90deg, rgba(9,121,71,0.9612219887955182) 27%, rgba(0,176,255,1) 100%)'}} colorScheme='green' variant='solid'>{loading.estado?<Spinner />:<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Buscar</span>}</Button>
                </form>
                <TableContainer id='tableContainer'>
                    <Table size='sm'>
                        <Thead>
                        <Tr>
                            <Th>nombre</Th>
                            <Th>cuit</Th>
                            <Th>e-mail</Th>
                            <Th>estado</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {loading.client.map(cliente=>(
                                <Tr key={cliente.id}>
                                    <Td>{cliente.name}</Td>
                                    <Td>{cliente.CUIT}</Td>
                                    <Td>{cliente.email}</Td>
                                    <Td>
                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                            {cliente.status?(<span style={{color:'green'}}>Activo</span>):(<span style={{color:'red'}}>Inactivo</span>)}
                                            <SettingsIcon onClick={()=>{handleDetail(cliente.CUIT)}}/>
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
    )
}

export default ClientSearch