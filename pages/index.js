import React, { useEffect, useState } from 'react';
import Pagina from '../components/Pagina';
import MensagemBoasVindas from '../components/MensagemBoasVindas';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import CustomButton from '../components/Button';
import styles from '../styles/Home.module.css';

const index = () => {
  return (
    <> 
        <Pagina titulo="DevTeca" hasFooter>     
        <div className={styles.home}>     
          <MensagemBoasVindas />
           <Container>
             <Row className="justify-content-center">
               <Col xs={12} sm={12} className="text-center">
                 <div className={styles.buttonContainer}>
                   <CustomButton variant="primary" text="Alugar" link="/newpedido" />
                   <CustomButton variant="primary" text="Devolver" link="/pedidos" />
                 </div>
               </Col>
             </Row>
           </Container>
        </div>
        </Pagina>
        <Footer />
    </>
  );
};

export default index;