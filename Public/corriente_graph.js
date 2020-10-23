// Real time graphing of the varible current on the web page
// Using plotly
// Author Jaime Fanjul García
// Date: 20/08/2020

controlDatoCorriente= "espera";

function nuevoDatoCorriente(){
  controlDatoCorriente="nuevo";
}

function getDataCorriente() {
  if(controlDatoCorriente== "nuevo"){
    return obtenerCorriente();
  }
  else {
    return null;
  }
}

var layout = {
    title: 'Corriente Descarga Baterías',
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

var time = new Date();

var data = [{
  x: [time],
  y: [getDataCorriente()],
  mode: 'lines',
  line: {color: '#80CAF6'}
}];


Plotly.plot('corrienteBat_chart', data,layout,config);

var cnt = 0;

var interval = setInterval(function() {

  if (getDataCorriente() == null){
    return;
  }
  else {
    var time = new Date();

    var update = {
    x:  [[time]],
    y: [[getDataCorriente()]]
    };

    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);

    var minuteView = {
      xaxis: {
        type: 'date',
        range: [olderTime,futureTime]
      }
    };

    Plotly.relayout('corrienteBat_chart', minuteView);
    Plotly.extendTraces('corrienteBat_chart', update, [0]);
    controlDatoCorriente="espera";

    if(cnt === 100)clearInterval(interval);
  }
}, 1);
