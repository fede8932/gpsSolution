/* eslint-disable react-hooks/exhaustive-deps */
//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { effectLogin } from './states/user'
import NewUser from './components/NewUser';
import NewDevice from './components/NewDevice';
import NewVehicle from './components/NewVehicle';
import ClientSearch from './components/ClientSearch';
import ClientSinglePage from './components/ClientSinglePage';
import VehicleSearch from './components/VehicleSearch';
import Home from './components/Home';
import Sidebar from './components/Sidebar';

function App() {
  const user = useSelector(state=>state.user)
  console.log(user.data);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(effectLogin())
      .then((res) => {
        console.log('user ok')
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      {user.data?(
      <><Sidebar/><Navbar/></>):<></>}
      <Routes>
        <Route path="/" element={user.data?<Home/>:<Login/>}/>
        <Route path="/new/user" element={<NewUser/>}/>
        <Route path="/new/device" element={<NewDevice/>}/>
        <Route path="/new/vehicle" element={<NewVehicle/>}/>
        <Route path="/search/user" element={<ClientSearch/>}/>
        <Route path="/singleuser" element={<ClientSinglePage/>}/>
        <Route path="/search/vehicle" element={<VehicleSearch/>}/>
      </Routes>
    </div>
  );
}

export default App;
