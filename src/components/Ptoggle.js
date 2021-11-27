import React from 'react';

function Ptoggle({name,settings,handleChangePrice,handleChangingInput,updateValue}) {
    return ( 
        <>
          {
              settings === false ? 
              <p className="App-p-price" onClick={handleChangePrice} >{updateValue}</p>
              :
              <input type="number" placeholder="SOLO PON LA CANTIDAD EXACTA" onChange={handleChangingInput} name={name} />
          }
        </>
     );
}

export default Ptoggle;