import React,{useState,useEffect} from 'react';
import './App.css';
import Ptoggle from './components/Ptoggle';
import html2canvas from 'html2canvas'
const reqSvgs = require.context ( '../public/svg', true, /\.svg$/ )

function App() {
  let defaulValues ={
    airtm: "",
    binance: "",
    payonner: "",
    reserve: "",
    skrill: "",
    uphold: "",
    zelle: "",
  }
  let today = new Date()
  let fecha = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  const [hora,setHora] = useState(new Date().toLocaleTimeString())
  const [settings, setSettings] = useState(false);
  const [newValues, setNewValues] = useState(defaulValues);
  const handleChangePrice = () =>setSettings(true)
  const paths = reqSvgs.keys()
  const handleChangingInput = (e) => {
    console.log(typeof e.target.value)
    switch (e.target.value) {
      case "-1":
        setNewValues({...newValues,[e.target.name]:""})
        break;
      default:
        setNewValues({...newValues,[e.target.name]:e.target.value})
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
        <h1 className="App-h1-title">
          <span className="App-span-tasa">TASA</span>
          <span className="App-span-delDia">DEL DIA</span>
        </h1>
        <p className="App-p-dateAndHour">{"Fecha: "+ fecha + " // Hora: " + hora }</p>
        <img src="logo.svg" className="App-img-logo" alt="Logo" />
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
                  updateValue={Object.values(newValues)[index] === "" ? "Consultar" : Object.values(newValues)[index] + " BS/$" }
                  />
                </div>
              )})
          }
        </div>
        <div className="App-div-borderR">
          <span className="App-span-remesasSize">Remesas</span>
          <p className="App-p-remesas">
          <span className="App-span-remesas">🇨🇴 COLOMBIA</span>
          <span className="App-span-remesas">🇨🇱 CHILE</span>
          <span className="App-span-remesas">🇵🇦 PANAMÁ</span>
          <span className="App-span-remesas">🇵🇪 PERU</span>
          <span className="App-span-remesas">🇪🇨 ECUADOR</span>
          </p>
          {/* <p className="App-p-copBs">COP ⇆ BS</p>
          {
            settings === false ?
            <p className="App-p-scoreCopBs" onClick={handleChangePrice}>{Object.values(newValues)[6] === "" ? "Consultar":Object.values(newValues)[6]}</p>
            :
            <input type="number" className="App-input-scoreCopBs" placeholder="SOLO COLOCA LA CANTIDAD EXACTA" name="cop"onChange={handleChangingInput} />
          } */}
        </div>
        <div className="App-div-socialMedia">
          <i class="fab fa-instagram App-i-instagram"> Kriptocambios.ve </i>
          </div>
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
