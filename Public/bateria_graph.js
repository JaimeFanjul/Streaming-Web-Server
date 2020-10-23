// Real time graphing of the varible baterry voltage on the web page
// Using plotly
// Author Jaime Fanjul García
// Date: 20/08/2020

// getData(se encarga de obtener los datos, a partir de la función definida en el main.js
// del frontend

controlDatoVoltaje= "espera";

function nuevoDatoVoltaje(){
  controlDatoVoltaje="nuevo";
}

function getDataVoltaje() {
  if(controlDatoVoltaje == "nuevo"){
      return obtenerVoltaje();
  }
  else {
    return null;
  }
}

var time = new Date();

var layout = {
    title: 'Voltaje Baterías',
    uirevision:'true',
    xaxis: {autorange: true},
    yaxis: {autorange: true},
    plot_bgcolor:"black",
    paper_bgcolor:"#21252b",
    autosize: false,
    width: 1000,
    height: 350,
    font: {
      color:"#FFF",
      size: 10
    }
};

var config = {
  displaylogo: false,
  responsive: true
};

var data = [{
  x: [time],
  y: [getDataVoltaje()],
  mode: 'lines',
  line: {color: '#f4427d'}
}];


Plotly.plot('voltajeBat_chart', data,layout,config);

var cnt = 0;

var interval = setInterval(function() {

  if (getDataVoltaje() == null){
    return;
  }
  else {
    var time = new Date();

    var update = {
    x:  [[time]],
    y: [[getDataVoltaje()]]
    };

    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);

    var minuteView = {
      xaxis: {
        type: 'date',
        range: [olderTime,futureTime]
      }
    };

    Plotly.relayout('voltajeBat_chart', minuteView);
    Plotly.extendTraces('voltajeBat_chart', update, [0]);
    controlDatoVoltaje="espera";

    if(cnt === 100)clearInterval(interval);
  }
}, 1);
