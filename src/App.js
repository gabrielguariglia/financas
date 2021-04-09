import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"


import { RiMoneyDollarCircleFill, RiMoneyEuroCircleFill } from 'react-icons/ri'
import { GiMagnifyingGlass } from 'react-icons/gi'


function App() {
  const [moeda, setMoeda] = useState('')

  async function obtemMoeda(moeda) {
    let chaveAPI = process.env.REACT_APP_APIKEY
    let url = `https://api.hgbrasil.com/finance?key=${chaveAPI}`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(function (error){
      console.error(`Erro ao obter a Moeda: ${error.message}`)
    })

  }


  return (
    <>
      <Navbar bg="warning">
        <Navbar.Brand href="#inicio"><b>FatecFinanças</b></Navbar.Brand>
      </Navbar>
      <Jumbotron>
        <h1><b>Fatec Finanças<GiMagnifyingGlass/></b></h1>
        <h2>
          Consulta da cotação das principais moedas ao redor do globo.
            </h2>
      </Jumbotron>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" moeda="USD" onClick={() => {obtemMoeda(moeda)}}>
            <RiMoneyDollarCircleFill color="#000000" size="23" /> Clique aqui para ver a cotação do Dolar
      </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <h6>Dolar : </h6> 
              <h6>Preço de Compra : </h6>
              <h6>Preço de Venda : </h6>
              <h6>Variação em Porcentagem : </h6>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
             <RiMoneyEuroCircleFill color="#000000" size="23" /> Cotação do Euro
      </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default App;
