import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"


function App() {
  const [moeda, setMoeda] = useState('')


  async function obtemMoeda(moeda) {
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
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Cotação do Dollar
      </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Cotação do Euro
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
