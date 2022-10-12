import { Alert,AlertIcon,Spinner,Container,Input,Button,Link,FormControl,FormLabel} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import logo from '../assets/img/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from '../states/user';

function Login (){
    const {register,handleSubmit,formState: { errors }} = useForm();
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const login = async(data)=>{
        dispatch(setUser(data))
    }
    return (
            <Container style={{boxShadow: '0px 0px 22px 0px rgba(71,71,71,0.61)',margin:'3rem auto' , border:'0.1px solid #F2F2F2' , borderRadius:'5px'}}>
                <form onSubmit={handleSubmit(login)} style={{margin:'3rem'}}>
                    <div>
                        <img src={logo} alt="" />
                    </div>
                    <h1 style={{fontSize:'2.5rem',marginBottom:'0.8rem'}}>Sing In</h1>
                    <FormControl>
                        <FormLabel style={{marginBottom:'0.5rem'}} htmlFor='email'>Dirección E-mail</FormLabel>
                        <Input id='email' type='text' 
                        {...register("email", {
                        required: {
                        value: true,
                        message: "*Campo obligatorio"},
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "El formato no es correcto"}})}/>
                        <div style={{height:'1.5rem',display:'flex'}}>
                        {errors.email && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.email.message}</span>}
                        </div>
                    </FormControl>
                    <FormControl>
                        <FormLabel style={{marginBottom:'0.5rem'}} htmlFor='password'>Contraseña</FormLabel>
                        <Input id='password' type='password' 
                        {...register("pass", {
                        required: {
                        value: true,
                        message: "*Campo obligatorio"}})}/>
                        <div style={{height:'1.5rem',display:'flex'}}>
                        {errors.pass && <span style={{justifyContent:'flex-start',fontSize:'12px',color:'red',marginLeft:'1rem'}}>{errors.pass.message}</span>}
                        </div>
                    </FormControl>
                    {user.error===null?(<></>):(
                    <Alert status='error'>
                        <AlertIcon />
                        Datos ingresados no validos
                    </Alert>
                    )}
                    <Button type='submit' style={{borderRadius:'40px',maxWidth:'12rem', marginTop:'2rem' , marginBottom:'2rem' , width:'100%',background: 'linear-gradient(90deg, rgba(9,121,71,0.9612219887955182) 27%, rgba(0,176,255,1) 100%)'}} colorScheme='green' variant='solid'>{user.loading?<Spinner />:<span>Iniciar sesión</span>}</Button>
                    <br />
                    <Link>Olvidé mi contraseña</Link>
                </form>
            </Container>
    )
}

export default Login