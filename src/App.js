import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { GiMagnifyingGlass } from 'react-icons/gi'


function App() {
  const [moeda, setMoeda] = useState('')
  const [valor, setValor] = useState(null)
  const [obtendoMoeda, setObtendoMoeda] = useState(false)

  //pegando valores da API
  async function obtemMoeda(moeda) {
    setObtendoMoeda(true)
    let chaveAPI = process.env.REACT_APP_APIKEY
    let url = `https://api.hgbrasil.com/finance?array_limit=1&fields=only_results,${moeda}&key=${chaveAPI}`
    await fetch(url)
    
      .then(response => response.json())
      .then(data => {
        setValor(data)
      })
      .catch(function (error) {
        console.error(`Erro ao obter a Moeda: ${error.message}`)
      })
    setObtendoMoeda(false)
  }


  return (
    <>
      <Navbar bg="warning">
        <Navbar.Brand href="#inicio">FatecFinanças</Navbar.Brand>
      </Navbar>
      <Jumbotron >
        <h1> Fatec Finanças</h1>
        <h3>Consulta da cotação das principais moedas ao redor do globo.</h3>
        <h3>Para que a aplicação funcione é nescessario instalar e ativar a extensão moesif origin.</h3>
        <a href="https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc">clique aqui para instalar a extensão</a>
        <h3></h3>
      </Jumbotron>

       {/* Seleciona a moeda que o usuario queira ver */}
      <Row className="justify-content-center">
        <select onChange={event => setMoeda(event.target.value)}>
          <option value="">  Selecione uma moeda </option>
          <option value="BTC"> Bitcoin </option>
          <option value="EUR"> Euro</option>
          <option value="GBP"> Libra Esterlina </option>
          <option value="USD"> Dólar</option>
          <option value="ARS"> Peso Argentino</option>
          <option value="JPY"> Iene  </option>
        </select>
        
      </Row>
      
      <Row className="justify-content-center">
        
        {valor &&
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{valor.currencies.name}</Card.Title>
              <Card.Text>
                <h6>Valor : R${valor.currencies.buy}</h6>
                <h6>Variação : {valor.currencies.variation}%</h6>
              </Card.Text>
            </Card.Body>
          </Card>
        }
      </Row>

      {/* Ative a função que busca os valores na API */}
      <Row className="justify-content-center">
        <Button onClick={() => obtemMoeda(moeda)} variant="success">
          {obtendoMoeda ? <Spinner size="sm" animation="grow" /> : <GiMagnifyingGlass color="#000000" size="20" />}
        Obter Moeda</Button>
      </Row>
    </>
  );
}

export default App;