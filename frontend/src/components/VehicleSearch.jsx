import { Spinner,Container,Input,Button,TableContainer,FormControl,FormLabel,Table,Thead,Tr,Th,Tbody,Td} from '@chakra-ui/react';
// import { SettingsIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form";
import newUser from '../assets/img/icon/vehicleSearch.png'
import { /* useDispatch ,*/ useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import swal from "sweetalert";
import axios from 'axios';
// import { clientDetail } from '../states/clientDetail';

function VehicleSearch (){
    const user = useSelector(state=>state.user);
    const initialState = {
        id:'',
        marca:'',
        modelo:'',
        patente:'',
        chasis:'',
        motor:'',
        color:'',
        device_id:'',
        user:{
            fullName:''
        }
    }
    const [loading , setLoading] = useState({vehicle:initialState,estado:false})
    const {register,handleSubmit,formState: { errors }} = useForm();
    const token = user.data.token
    // const navigate = useNavigate();
    // const dispatch = useDispatch()
    // const handleDetail = (cuit)=>{
    //     dispatch(clientDetail({CUIT:cuit , token:token}))
    //     .then(()=>{navigate('/singleuser')})
    //     .catch(err=>console.log(err))
    // }
    const vehicleSearch =(data)=>{
        setLoading({vehicle:initialState,estado:true})
        axios({
            method: 'post',
            headers: {"Authorization": `Bearer ${token}`},
            url: 'https://gps-proyect.herokuapp.com/api/admin/vehicle/dom',
            data: data
          })
        .then(res=>{
            if(res.data===null){
                setLoading({vehicle:initialState,estado:false})
                swal({
                    title: "Error",
                    text: "No se encontraron resultados",
                    icon: "error",
                    button: "Atras",
                });
            }else{
                setLoading({vehicle:res.data,estado:false})
            }
        })
        .catch(err=>{
            setLoading({vehicle:initialState,estado:false})
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
                <form onSubmit={handleSubmit(vehicleSearch)} className='newUserForm'>
                    <div>
                        <img style={{width:'11rem',margin:'auto'}} src={newUser} alt="" />
                    </div>
                    <h1 style={{fontSize:'2rem',margin:'0.5rem'}}>Buscar vehiculo</h1>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <FormControl style={{margin:'1rem',maxWidth:'20rem'}}>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='text'>Patente</FormLabel>
                        <Input placeholder='AA999ZZ ó FFF555' id='name' type='text' 
                        {...register("dominio")}/>
                        <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.patente && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.patente.message}</span>}
                        </div>
                    </FormControl>
                    </div>
                    <Button type='submit' style={{borderRadius:'40px',maxWidth:'12rem', marginTop:'2rem' , marginBottom:'1rem' , width:'100%',background: 'linear-gradient(90deg, rgba(9,121,71,0.9612219887955182) 27%, rgba(0,176,255,1) 100%)'}} colorScheme='green' variant='solid'>{loading.estado?<Spinner />:<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Buscar</span>}</Button>
                </form>
                <TableContainer id='tableContainer' style={{marginBottom:'3rem'}}>
                    <Table size='sm'>
                        <Thead>
                        <Tr>
                            <Th>Marca</Th>
                            <Th>Modelo</Th>
                            <Th>Patente</Th>
                            <Th>Color</Th>
                            <Th>Dispositivo</Th>
                            <Th>Propietario</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>{loading.vehicle.marca.toUpperCase()}</Td>
                                <Td>{loading.vehicle.modelo.toUpperCase()}</Td>
                                <Td>{loading.vehicle.patente.toUpperCase()}</Td>
                                <Td>{loading.vehicle.color.toUpperCase()}</Td>
                                <Td>{loading.vehicle.device_id}</Td>
                                <Td>{loading.vehicle.user.CUIT}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
    )
}

export default VehicleSearch