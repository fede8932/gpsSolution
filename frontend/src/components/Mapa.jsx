import { Marker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { centro } from "../utils/geoCalculador";
import { objToArray } from "../utils/objToArray";
import { useMap } from "react-leaflet";
import { Divider } from "@chakra-ui/layout";
import { timeFormat } from "../utils/timeFormat";

const L = require('leaflet');
const Mapa = function () {
  const myIcon = L.icon({
      iconUrl: require('../assets/img/autoGpsIcon.png'),
      iconSize: [35,35],
      iconAnchor: [9, 37],
      popupAnchor: [9,-37],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
  });

  const ubicaciones = useSelector(state=>state.geoDetail.data)
  const ubicArray = objToArray(ubicaciones)
  console.log('ubic', ubicArray);
  function ActualizarCentro({props}) {
      const map = useMap()
      map.setView(props.centro,8)
    return null;
    }
  return (
    <MapContainer center={[-34.59798186589201, -58.6177733188292]} zoom={11} id='mapa'>
      {Object.keys(ubicaciones).length === 0?(<></>):(<ActualizarCentro props={{centro:centro(ubicaciones)}}/>)}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.keys(ubicaciones).length === 0?(<></>):(
        ubicArray.map((unidad,i)=>(
          <Marker key={i} position={unidad.data.coordenadas} icon={myIcon}>
            <Popup>
              <div style={{width:'12rem', display:'flex' , flexDirection:'column' , alignItems:'center'}}>
                <div>
                  <span style={{fontWeight: 'bold'}}>Patente: </span><span style={{fontWeight: 'bold', color:'green'}}>{unidad.unidad}</span></div>
                <Divider />
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                  <div><span style={{fontWeight: 'bold'}}>Fecha: </span><span>{timeFormat(unidad.data.fecha)}</span></div>
                  <div><span style={{fontWeight: 'bold'}}>Estado: </span><span>{unidad.data.status?'Encendido':'Apagado'}</span></div>
                  <div><span style={{fontWeight: 'bold'}}>Velocidad: </span><span>{unidad.data.velocidad}</span></div>
                  <div><span style={{fontWeight: 'bold'}}>Lat: </span><span>{unidad.data.coordenadas[0]}</span></div>
                  <div><span style={{fontWeight: 'bold'}}>Lon: </span><span>{unidad.data.coordenadas[1]}</span></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
)};
export default Mapa;
