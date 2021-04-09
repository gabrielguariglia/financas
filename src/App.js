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
  const [ moeda, setMoeda ] = useState('')
  const [ valor, setValor ] = useState(null)
  const [obtendoMoeda, setObtendoMoeda] = useState(false)

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
      <Jumbotron>
        <h1> Fatec Finanças</h1>
        <h2>
          Consulta da cotação das principais moedas ao redor do globo.
            </h2>
      </Jumbotron>
      <Row className="justify-content-center">
        <div>
        <select onChange={event => setMoeda(event.target.value)}>
          <option value="">  Selecione uma moeda </option>
          <option value="BTC"> Bitcoin </option>
          <option value="EUR"> Euro</option>
          <option value="GBP"> Libra Esterlina </option>
          <option value="USD"> Dólar</option>
          <option value="ARS"> Peso Argentino</option>
          <option value="JPY"> Iene  </option>
        </select>
        </div>
        <div>
        {obtendoMoeda &&
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
        }
        </div>
        {valor &&
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{valor.currencies.name}</Card.Title>
            <Card.Text>
            <h6>Valor : {valor.currencies.buy}</h6>
            <h6>Variação : {valor.currencies.variation}%</h6>
            </Card.Text>
          </Card.Body>
        </Card>
        }
      </Row>
      <Row className="justify-content-center">
      <Button onClick={() => obtemMoeda(moeda)}>
        {obtendoMoeda ? <Spinner size="sm" animation="grow" /> : <GiMagnifyingGlass color="#000000" size="20" />}
        Obter Moeda</Button>
      </Row>
    </>
  );
}

export default App;