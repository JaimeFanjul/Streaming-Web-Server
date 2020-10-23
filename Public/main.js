// frontend web server
// Author Jaime Fanjul García
// Date: 20/08/2020

// variables almacenar los datos corriente y baterias de las gráficas
// Variable control estado indica si es un dato nuevo o está en espera a recibirlo, comienza en espera
datos_corriente=null;
datos_voltaje=null;

//creamos el socket que escuchara en tiempo real frontend
var socket = io.connect('http://192.168.2.106:8080', { 'forceNew': true });

// una vez creado el socket
// escuchamos el evento emitido por el servidor llamado
// telemetriaInfo que contiene la info que queremos
socket.on('telemetriaInfo', function(data) {
  //var info=JSON.stringify(data);
  console.log(data);
  render(data);
});

// función encargada de analizar la info
// de telemetria recibida
function render (data) {

  if (data.tipo_datos==1)
  {
    // Represento la velocidad ruedas delanteras en su div
    var WS_FL_container = document.getElementById('velocidad_FWL');
    WS_FL_container.innerHTML = data.WS_FL +' km/h' + '<br/>Contador: '+data.Contador;
    var WS_FR_container = document.getElementById('velocidad_FWR');
    WS_FR_container.innerHTML = data.WS_FR +' km/h';
    return;
  }
  else if (data.tipo_datos==2)
  {
    // Represento la velocidad ruedas traseras en su div
    var WS_RL_container = document.getElementById('velocidad_RWL');
    WS_RL_container.innerHTML = data.WS_RL +' km/h'+ '<br/>Contador: '+data.Contador;
    var WS_RR_container = document.getElementById('velocidad_RWR');
    WS_RR_container.innerHTML = data.WS_RR +' km/h';
    return;
  }
  else if (data.tipo_datos==3)
  {
    // Represento la velocidad en su div
    var WS_container = document.getElementById('velocidad');
    WS_container.innerHTML = data.Vehicle_Speed +' km/h'+ '<br/>Contador: '+data.Contador;
    return;
  }
  else if (data.tipo_datos==4)
  {
    // Represento el voltaje bateria en su div
    datos_voltaje = guardarVoltaje(data.Battery_Voltage);
    var Voltage_container = document.getElementById('voltajeBat');
    Voltage_container.innerHTML = data.Battery_Voltage +' V' + '<br/>Contador: '+data.Contador;
    return;
  }
  else if (data.tipo_datos==5)
  {
    // Represento el modo de conducción en su div
    var Drive_container = document.getElementById('modo_conduccion');
    Drive_container.innerHTML = data.Drive_Mode + '<br/>Contador: '+data.Contador;
    return;
  }
  else if (data.tipo_datos==6)
  {
    // Represento la corriente en su div
    datos_corriente = guardarCorriente(data.EM_Current);
    var EM_container = document.getElementById('corriente');
    EM_container.innerHTML = data.EM_Current +' A'+ '<br/>Contador: '+data.Contador;
    return;
  }
  else {
    return;
  }
}

function guardarVoltaje (datos){
  nuevoDatoVoltaje();                            // indica que el dato es nuevo, ya que a esta función solo se llama cuando un dato es nuevo
  return datos;
}

function guardarCorriente (datos){
  nuevoDatoCorriente();                            // indica que el dato es nuevo, ya que a esta función solo se llama cuando un dato es nuevo
  return datos;
}

function obtenerVoltaje (){
  return datos_voltaje;
}

function obtenerCorriente (){
    return datos_corriente;
}
