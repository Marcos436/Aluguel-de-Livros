import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from "next/router";
import Nav from 'react-bootstrap/Nav';

import {IoMdBook} from "react-icons/io";
import {BiBox} from "react-icons/bi";
import {BsFilePersonFill, BsFillPersonFill, BsPerson} from "react-icons/bs";
import {RiFilePaperLine} from "react-icons/ri";
import {MdOutlineDashboard} from "react-icons/md";

const Cabecalho = ({show, setShow}) => {

    const router = useRouter();

    const handleClose = () => setShow(false);

  return (

      <>

      <Offcanvas show={show} onHide={handleClose} style={{width:'250px'}}>
          <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body >


              <Nav className="me-auto">
                  <div className="d-flex flex-column bd-highlight mb-3">
                  <Nav.Link onClick={()=>{ router.push("/")}} style={{textDecoration:'none',color:'#000'}}><h5> <MdOutlineDashboard size={'24px'}/> Dashboard </h5></Nav.Link>
                  <Nav.Link onClick={()=>{ router.push("/acervo")}} style={{textDecoration:'none',color:'#000'}}><h5> <IoMdBook size={'24px'}/> Acervo </h5></Nav.Link>
                  <Nav.Link onClick={()=>{ router.push("/estoque")}} style={{textDecoration:'none',color:'#000'}}><h5> <BiBox size={'24px'}/> Estoque </h5></Nav.Link>
                  <Nav.Link onClick={()=>{ router.push("/clientes")}} style={{textDecoration:'none',color:'#000'}}><h5> <BsPerson size={'24px'}/> Clientes </h5></Nav.Link>
                  <Nav.Link onClick={()=>{ router.push("/pedidos")}} style={{textDecoration:'none',color:'#000'}}><h5> <RiFilePaperLine size={'24px'}/> Pedidos </h5></Nav.Link>
                  </div>
              </Nav>


          </Offcanvas.Body>
      </Offcanvas>
      </>
  );
};

export default Cabecalho;
