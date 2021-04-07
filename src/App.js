import React, { useState } from 'react'

function App() {
  const[moeda,setMoeda] = useState('')


  async function obtemMoeda(moeda){
    let chaveAPI = process.env.REACT_APP_APIKEY
    let url = `https://api.hgbrasil.com/finance?key=${chaveAPI}`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setMoeda(data)
      console.log(data)
    })
    .catch(function (error) {
      console.error(`${error.message}`)
    })

  }


  return (
    <div>
          <div> 
            
          </div>
    </div>
  );
}

export default App;
