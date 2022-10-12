/* eslint-disable jsx-a11y/alt-text */
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, SettingsIcon, TimeIcon } from '@chakra-ui/icons'
import vehicle from '../assets/img/icon/truck.svg'
import newUser from '../assets/img/icon/user-plus.svg'
import device from '../assets/img/icon/device.svg'
import search from '../assets/img/icon/search.svg'
import logo from '../assets/img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { searchDevice } from '../states/devices'

function Navbar (){
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const logout = ()=>{
    //     localStorage.removeItem('user');
    //     navigate('/')
    //     window.location.reload()
    // }
    const setDevice = ()=>{
        dispatch(searchDevice(user.data))
        navigate('/new/vehicle')
    }
    return (
        <div id='navbar'>
            <div style={{display:'flex'}}>
                <h1 style={{fontFamily: 'EB Garamond', fontSize: '44px'}}>IKUSI</h1>
                <img style={{maxWidth:'5rem'}} src={logo} alt="" />
            </div>
            <div style={{display:'flex',marginTop:'0.6rem'}}>

                <div  style={{marginLeft:'1rem'}}>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                        />
                        <MenuList>
                            <MenuItem onClick={()=>{navigate('/')}} icon={<TimeIcon/>} command=''>
                            Inicio
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate('/new/user')}} icon={<img style={{width:'1rem'}} src={newUser}></img>} command=''>
                            Nuevo usuario
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate('/new/device')}} icon={<img style={{width:'1rem'}} src={device}></img>} command=''>
                            Nuevo dispositivo
                            </MenuItem>
                            <MenuItem onClick={setDevice} icon={<img style={{width:'1rem'}} src={vehicle}></img>} command=''>
                            Nuevo vehiculo
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate('/search/user')}} icon={<img style={{width:'1rem'}} src={search}></img>} command=''>
                            Buscar cliente
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate('/search/vehicle')}} icon={<img style={{width:'1rem'}} src={search}></img>} command=''>
                            Buscar vehiculo
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate('/search/vehicle')}} icon={<SettingsIcon/>} command=''>
                            Cuenta
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Navbar