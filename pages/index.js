import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Jumbotron from "react-bootstrap/Jumbotron"
import CIAWorldBook from "../components/visualizations/CIAFactBook"
export default function Home() {
  return (
    <>
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className={styles.main}>
        <Jumbotron>
          <h1>Data Visualization Examples</h1>
        </Jumbotron>
      </Row>
      <Row>
          
      </Row>
      <Row className={styles.footer}>
          {/* Footer */}
      </Row>
    </Container>
      <CIAWorldBook />
      </>
  )
}
