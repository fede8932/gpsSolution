import { Spinner,Container,Input,Button,Select,FormControl,FormLabel,Table,Thead,Tr,Th,Tbody,TableContainer,Td} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import newUser from '../assets/img/icon/singleUser.jpg'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import swal from "sweetalert";
import axios from 'axios';

function ClientSinglePage (){
    const user = useSelector(state=>state.user);
    const client = useSelector(state=>state.clientDetail)
    const unidades = client.data.unidades
    const [loading , setLoading] = useState({client:[],estado:false})
    const {register,handleSubmit,formState: { errors }} = useForm();
    const token = user.data.token
    const navigate = useNavigate();
    const clientEdit =(data)=>{
        setLoading({client:client,estado:true})
        for (let prop in data){
            if(data[prop]===''){
                delete data[prop]
            }
        }
        axios({
            method: 'patch',
            headers: {"Authorization": `Bearer ${token}`},
            url: `https://gps-proyect.herokuapp.com/api/admin/client/${client.data.id}`,
            data: data
          })
        .then(res=>{
            setLoading({client:res.data,estado:false})
            swal({
                title: "Modificado",
                text: "Se han modificado los datos con exito",
                icon: "success",
                button: "Aceptar",
            });
            navigate('/')
        })
        .catch(err=>{
            swal({
                title: "No modificado",
                text: "Ocurrió un error al intentar modificar",
                icon: "error",
                button: "Aceptar",
            });
        })
    }
    return (
            <Container id='contenedor'>
                <form onSubmit={handleSubmit(clientEdit)} className='newUserForm'>
                    <div>
                        <img style={{width:'10rem',margin:'auto'}} src={newUser} alt="" />
                    </div>
                    <div style={{margin:'0.4rem'}}>
                    <h1 style={{fontSize:'2rem'}}>{client.data.name}</h1>
                    {client.data.status?(<span style={{color:'green'}}>Active</span>):(<span style={{color:'red'}}>Inactive</span>)}
                    </div>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='text'>CUIT</FormLabel>
                        <Input value={client.data.CUIT} id='name' type='text' disabled={true}/>
                    </FormControl>
                    <FormControl className='newUserFormControl'>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='email'>Dirección E-mail</FormLabel>
                        <Input placeholder={client.data.email} id='email' type='text' 
                        {...register("email", {
                            pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "El formato no es correcto"}})}/>
                            <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.email && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.email.message}</span>}
                            </div>
                    </FormControl>
                    <FormControl style={{margin:'1rem',width:'28rem'}}>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='number'>Estado</FormLabel>
                        <Select placeholder='Select'
                        {...register("status", {})}>
                            <option value={true}>{'Active'}</option>
                            <option value={false}>{'Inactive'}</option>
                        </Select>
                        <div style={{height:'0.5rem',display:'flex'}}>
                        {errors.prov && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.prov.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl style={{margin:'1rem',width:'28rem'}}>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='text'>Fin de contrato</FormLabel>
                        <Input id='fechaInico' type='date'
                        {...register("endDate", {})}/>
                    </FormControl>
                    </div>
                    <div className='inputContainer'>
                    <FormControl className='newUserFormControl'>
                        <FormLabel style={{marginLeft:'4px',marginBottom:'0.2rem',fontSize:'13px'}} htmlFor='email'>Domicilio</FormLabel>
                        <Input placeholder={client.data.address} id='email' type='text' 
                        {...register("address", {})}/>
                            <div style={{height:'0.5rem',display:'flex'}}>
                            {errors.address && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.address.message}</span>}
                            </div>
                    </FormControl>
                    </div>
                    <Button type='submit' id='singleUserPageButton' colorScheme='green' variant='solid'>{loading.estado?<Spinner />:<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Guardar</span>}</Button>
                    <Button type='submit' id='singleUserPageButtonActivity' colorScheme='green' variant='solid'>{loading.estado?<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Actividad</span>:<span style={{textShadow: '1px 1px 5px rgba(0,0,0,0.93)'}}>Actividad</span>}</Button>
                </form>
                <TableContainer id='tableContainer'>
                    <Table size='sm'>
                        <Thead>
                        <Tr>
                            <Th>Marca</Th>
                            <Th>Modelo</Th>
                            <Th>Patente</Th>
                            <Th>Año</Th>
                            <Th>Dispositivo</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {unidades && unidades.map(unidad=>(
                                <Tr key={unidad.id}>
                                    <Td>{unidad.marca}</Td>
                                    <Td>{unidad.modelo}</Td>
                                    <Td>{unidad.patente}</Td>
                                    <Td>{unidad.año}</Td>
                                    <Td>{unidad.device.imei}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
    )
}

export default ClientSinglePage