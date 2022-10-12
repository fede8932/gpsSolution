import { Button } from '@chakra-ui/react'
import { TimeIcon } from '@chakra-ui/icons'
import logo from '../assets/img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { searchDevice } from '../states/devices'
import "../styles/sidebar.css";

function Sidebar (){
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = ()=>{
        localStorage.removeItem('user');
        navigate('/')
        window.location.reload()
    }
    const setDevice = ()=>{
        dispatch(searchDevice(user.data))
        navigate('/new/vehicle')
    }
    return (
        <div className='sideBox'>
            <div style={{display:'flex'}}>
                <h1 className='empresa'>IKUSI</h1>
                <img className='logo' src={logo} alt="" />
            </div>
            <div className='menuSidebar'>
            <Button id='sideButton' colorScheme='purple' onClick={()=>{navigate('/')}} icon={<TimeIcon/>} command=''>Inicio</Button>
            <Button id='sideButton' colorScheme='linkedin' onClick={()=>{navigate('/new/user')}} command=''>Nuevo usuario</Button>
            <Button id='sideButton' colorScheme='whatsapp' onClick={()=>{navigate('/new/device')}}>Nuevo dispositivo</Button>
            <Button id='sideButton' colorScheme='telegram' onClick={setDevice} command=''>Nuevo vehiculo</Button>
            <Button id='sideButton' colorScheme='pink' onClick={()=>{navigate('/search/user')}}>Buscar cliente</Button>
            <Button id='sideButton' colorScheme='orange' onClick={()=>{navigate('/search/vehicle')}}>Buscar vehiculo</Button>
            <Button id='sideButton' colorScheme='red' onClick={logout} icon={<TimeIcon/>} command=''>Cerrar sesión</Button>
            </div>
        </div>
    )
}

export default Sidebar