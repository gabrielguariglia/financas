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
  const [conversor, setConversor] = useState('')
  const [convertendo, setConvertendo] = useState(false)

  
  //pegando valores da API
  async function obtemMoeda(moeda) {
    setObtendoMoeda(true)
    let chaveAPI = process.env.REACT_APP_APIKEY
    let url = `https://api.hgbrasil.com/finance?format=json-cors&array_limit=1&fields=only_results,${moeda}&key=${chaveAPI}`
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

  //convertendo valor
  async function converteMoeda(conversor) {
    setConvertendo(true)
    let chaveAPI = process.env.REACT_APP_APIKEY
    let url = `https://api.hgbrasil.com/finance?format=json-cors&array_limit=1&fields=only_results,${conversor}&key=${chaveAPI}`
    await fetch(url)

      .then(response => response.json())
      .then(data => {
       
        //converte o valor inserido
        let num = parseFloat(document.getElementById("num").value);
        let result = num * data.currencies.buy;
        document.getElementById("resultado").value = result;
        

      })
      .catch(function (error) {
        console.error(`Erro ao obter a Moeda: ${error.message}`)
      })
      setConvertendo(false)
  }


  return (
    <>
      <Navbar bg="warning">
        <Navbar.Brand href="#inicio">FatecFinanças</Navbar.Brand>
      </Navbar>
      <Jumbotron >
        <h1> Fatec Finanças</h1>
        <h3>Consulta da cotação das principais moedas ao redor do globo.</h3>
        <h3>Conversor de moedas para real.</h3>
      </Jumbotron>

      {/* Seleciona a moeda que o usuario queira ver */}
      <Row className="justify-content-center">
        <h2 class="text-light">Veja a Cotação da moeda escolhida</h2>
      </Row>
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
                <h5>Valor : R${valor.currencies.buy}</h5>
                <h5>Variação : {valor.currencies.variation}%</h5>
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

      <Row>
        <br></br>
        <br></br>
      </Row>

        {/* Seleciona a moeda que  */}
        <Row className="justify-content-center">
          <h2 class="text-light">Converta o valor que quiser para real</h2>
        </Row>
      <Row className="justify-content-center">
        <select onChange={event => setConversor(event.target.value)}>
          <option value="">  Selecione uma moeda </option>
          <option value="BTC"> Bitcoin </option>
          <option value="EUR"> Euro</option>
          <option value="GBP"> Libra Esterlina </option>
          <option value="USD"> Dólar</option>
          <option value="ARS"> Peso Argentino</option>
          <option value="JPY"> Iene  </option>
        </select>

        <Row>
          <input type="number" min="0" id="num"></input>
        </Row>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text>
                R$<input type="number" step="0.01" id="resultado" readOnly />
              </Card.Text>
            </Card.Body>
          </Card>
      </Row>

      <Row className="justify-content-center">
        <Button onClick={() => converteMoeda(conversor)} variant="success">
          {convertendo ? <Spinner size="sm" animation="grow" /> : <GiMagnifyingGlass color="#000000" size="20" />}
          Converter</Button>
      </Row>

    </>
    
  );
}

export default App;