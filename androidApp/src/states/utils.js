import {PermissionsAndroid} from 'react-native';

export const inicioVerify = (inicio, fin) => {
  const now = new Date();
  if (inicio < fin && inicio < now) {
    return true;
  }
  throw new Error('Fecha de inicio incorrecta');
};

export const finalVerify = (inicio, fin) => {
  const now = new Date();
  if (fin > inicio && fin < now) {
    return true;
  }
  throw new Error('Fecha de final incorrecta');
};

export const vehicleVerify = vehicle => {
  if (vehicle) {
    return true;
  }
  throw new Error('Unidad no seleccionada');
};

export const center = arrayDeObj => {
  let latArray = [];
  let lonArray = [];
  let lat = 0;
  let lon = 0;
  const n = arrayDeObj.length;
  arrayDeObj.map(obj => {
    latArray.push(obj.latitude);
    lonArray.push(obj.longitude);
    lat = lat + obj.latitude;
    lon = lon + obj.longitude;
  });
  const latDel = (Math.max(...latArray) - Math.min(...latArray)) * 1.5;
  const lonDel = (Math.max(...lonArray) - Math.min(...lonArray)) * 1.5;
  return {
    latitude: lat / n,
    longitude: lon / n,
    latitudeDelta: latDel,
    longitudeDelta: lonDel,
  };
};
export const centrar = arrayDeObj => {
  let latArray = [];
  let lonArray = [];
  let lat = 0;
  let lon = 0;
  const n = arrayDeObj.length;
  arrayDeObj.map(obj => {
    latArray.push(Number(obj.coordenada_x));
    lonArray.push(Number(obj.coordenada_y));
    lat = lat + Number(obj.coordenada_x);
    lon = lon + Number(obj.coordenada_y);
  });
  const latDel = (Math.max(...latArray) - Math.min(...latArray)) * 1.5;
  const lonDel = (Math.max(...lonArray) - Math.min(...lonArray)) * 1.5;
  return {
    latitude: lat / n,
    longitude: lon / n,
    latitudeDelta: latDel,
    longitudeDelta: lonDel,
  };
};

export const realTimeCenter = arrayDeObj => {
  console.log(arrayDeObj);
  let latArray = [];
  let lonArray = [];
  let lat = 0;
  let lon = 0;
  const n = arrayDeObj.length;
  arrayDeObj.map(obj => {
    latArray.push(Number(obj.coordenada_x));
    lonArray.push(Number(obj.coordenada_y));
    lat = lat + Number(obj.coordenada_x);
    lon = lon + Number(obj.coordenada_y);
  });
  const latDel = (Math.max(...latArray) - Math.min(...latArray)) * 1.5;
  const lonDel = (Math.max(...lonArray) - Math.min(...lonArray)) * 1.5;
  return {
    latitude: lat / n,
    longitude: lon / n,
    latitudeDelta: latDel,
    longitudeDelta: lonDel,
  };
};

export const origenDestino = array => {
  let coordenadas = [];
  for (let i = 0; i < array.length - 1; i++) {
    coordenadas.push({
      origen: {latitude: array[i].latitude, longitude: array[i].longitude},
      destino: {
        latitude: array[i + 1].latitude,
        longitude: array[i + 1].longitude,
      },
    });
  }
  return coordenadas;
};

export const dateConverter = string => {
  console.log('recibido', string);
  const mes = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  const fecha = new Date(string);
  const exportFecha = `${fecha.getDate()}-${
    mes[fecha.getMonth()]
  }  ${fecha.getHours()}:${fecha.getMinutes()}`;
  return exportFecha;
};

export const velMax = reportes => {
  let velocidades = [];
  reportes.map((reporte, i) => {
    velocidades.push(Number(reporte.vel));
  });
  return `${Math.max(...velocidades)} Km/h`;
};

export const velMed = reportes => {
  let sumaVelocidad = 0;
  reportes.map((reporte, i) => {
    sumaVelocidad = sumaVelocidad + Number(reporte.vel);
  });
  const velocidadPromedio = sumaVelocidad / reportes.length;
  return `${velocidadPromedio} Km/h`;
};

export const locationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the app');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
