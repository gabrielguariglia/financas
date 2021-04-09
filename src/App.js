import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


function App() {
  const [ moeda, setMoeda ] = useState('')

  async function obtemMoeda(moeda) {
    let chaveAPI = process.env.REACT_APP_APIKEY
    let url = `https://api.hgbrasil.com/finance?array_limit=1&fields=only_results,${moeda}&key=${chaveAPI}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {

        setMoeda(data)
        console.log(moeda)


      })
      .catch(function (error) {
       console.error(`Erro ao obter a Moeda: ${error.message}`)
      })
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
        <select onChange={event => setMoeda(event.target.value)}>
          <option value="USD"> Dolar</option>
          <option value="EUR"> Euro</option>
          <option value="BTC"> Bitcoin </option>
        </select>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{moeda.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row className="justify-content-center">
      <Button onClick={() => {obtemMoeda(moeda)}} >Obter Moeda</Button>
      </Row>
    </>
  );
}

export default App;