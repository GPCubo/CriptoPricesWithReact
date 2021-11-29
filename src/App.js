import React,{useState,useEffect} from 'react';
import './App.css';
import Ptoggle from './components/Ptoggle';
import html2canvas from 'html2canvas'
const reqPngs = require.context ( '../public/png', true, /\.png$/ )
const reqSvgs = require.context ( '../public/svg', true, /\.svg$/ )

function App() {
  let defaulValuesMon ={
    airtm: "",
    binance: "",
    payonner: "",
    reserve: "",
    skrill: "",
    uphold: "",
    zelle: "",
    cl: "",
    co: "",
    ec: "",
    pa: "",
    pe: ""
  }
  let abreviaturas = [
    "CLP","COP","$","$","SOL"
  ]
  let today = new Date()
  let fecha = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  const [hora,setHora] = useState(new Date().toLocaleTimeString())
  const [settings, setSettings] = useState(false);
  const [newValuesMon, setNewValuesMon] = useState(defaulValuesMon);
  const handleChangePrice = () =>setSettings(true)
  const paths = reqSvgs.keys()
  const pathsPng = reqPngs.keys()
  const handleChangingInput = (e) => {
    console.log(e.target.name)
    switch (e.target.value) {
      case "-1":
        setNewValuesMon({...newValuesMon,[e.target.name]:""})
        break;
      default:
        setNewValuesMon({...newValuesMon,[e.target.name]:e.target.value})
        break;
    }
  }
  const handleSave = () =>{
    setSettings(false) 
  }
  const handlePrint =()=>{
    html2canvas(
      document.querySelector("#capture")).then(canvas => {
          var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
          var a = document.createElement('a');
          a.href = image;
          a.download = 'Diagrama.png';
          a.click();
      });
  }

  useEffect(() => {
    setInterval(() => {
      setHora(new Date().toLocaleTimeString())
  }, 1000);
  }, [hora]);

  return (
    <div className="App-div-center">
      <div className="App-div-colorAndSize" id="capture">
        <div className="App-div-logoAndTasaAndDate">
          <h1 className="App-h1-title">
            <span className="App-span-tasa">TASA</span>
            <span className="App-span-delDia">DEL DIA</span>
          </h1>
          <p className="App-p-dateAndHour">{"Fecha: "+ fecha + " // Hora: " + hora }</p>
          <img src="logo.svg" className="App-img-logo" alt="Logo" />
        </div>
        <div className="App-div-pricesAll">
          <div className="App-div-marginTop">
            {
              paths.map((el,index) =>{
                return(
                  <div key={index} className="App-div-borderRAndcolorDark">
                    {/* Se utilizo slice para remover ./ */}
                    <img src={"svg/"+el.slice(2)} alt="Logo" className="App-logo-size"/>
                    <Ptoggle 
                    name ={el.slice(2,-4).toLowerCase()}
                    settings={settings} 
                    handleChangePrice={handleChangePrice} 
                    handleChangingInput={handleChangingInput} 
                    updateValue={Object.values(newValuesMon)[index] === "" ? "Consultar" : Object.values(newValuesMon)[index] + " BS/$" }
                    />
                  </div>
                )})
            }
          </div>
          <div className="">
          {
              pathsPng.map((el,index) =>{
                return(
                  <div key={index} className="App-div-borderRAndcolorDark">
                    {/* Se utilizo slice para remover ./ */}
                    <img src={"png/"+el.slice(2)} alt="Logo" className="App-logo-size App-img-bandera"/>
                    <Ptoggle 
                    name ={el.slice(2,-4).toLowerCase()}
                    settings={settings} 
                    handleChangePrice={handleChangePrice} 
                    handleChangingInput={handleChangingInput} 
                    updateValue={Object.values(newValuesMon)[index + 7] === "" ? "Consultar" : Object.values(newValuesMon)[index + 7] + " BS/" + abreviaturas[index] }
                    />
                  </div>
                )})
            }
          </div>
        </div>
        <i class="fab fa-instagram App-i-instagram"> Kriptocambios.ve </i>
          <img src="assets/purplecurve.svg" alt="decoration" className="App-img-bgDecoration"/>
      </div>
      {
        settings === false ? <i class="fas fa-cog App-i-config" onClick={handleChangePrice} ></i> : <i class="fas fa-check App-i-config" onClick={handleSave}></i>
      }
      <i className="fas fa-camera App-i-capture" onClick={handlePrint}></i>
    </div>
  );
}

export default App;
