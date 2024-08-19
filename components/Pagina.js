import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import Cabecalho from './Cabecalho'
import { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import styles from "../styles/Home.module.css";

const Pagina = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
  return (
    <div style={{background:'#transparent',height:'90vh',overflow:'hidden'}}>
      <Cabecalho show={show} setShow={setShow} />
      <div className="py-3 text-white text-center mb-3" style={{background:'#244466'}}>
          <Container style={{marginLeft:'90px'}}>
              <Stack direction="horizontal" gap={4}>
                  <img src="/../menu.svg" alt="menu" className={styles.logo} onClick={handleShow}/>
                  <h5 style={{color:'#f8f8f8'}}>{props.titulo}</h5>
              </Stack>
          </Container>
      </div>
      <Container className='mb-5 pb-5' fluid style={{paddingLeft:'100px', paddingRight:'100px'}}>
      {props.children}
      </Container>
    </div>
  )
}
export default Pagina