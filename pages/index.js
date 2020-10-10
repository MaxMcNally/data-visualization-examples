import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import CIAWorldBook from "../components/visualizations/CIAFactBook"
export default function Home() {
  return (
    <>
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"><h1>Data Visualization Examples</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">

              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row>
      
      </Row>
      <Row>
      <Col md={12}>
        <CIAWorldBook />
      </Col>
    
      </Row>
      <Row className={styles.footer}>
          {/* Footer */}
      </Row>
    </Container>
     
      </>
  )
}
