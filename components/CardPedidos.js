import ListGroup from "react-bootstrap/ListGroup";
import React, {useState} from "react";
import {Badge, Button, Card} from "react-bootstrap";
import Link from "next/link";
import {deletarLocalStorage, editarLocalStorage, pegarLocalStorage} from "../services/localstorage";

import Modal from "react-bootstrap/Modal";
import {GrAdd} from "react-icons/gr";
import {MdGroupRemove} from "react-icons/md";
import {IoAdd, IoRemove} from "react-icons/io5";

const CardPedidos = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemoveAutor = (id) => {
        let allEstoque = pegarLocalStorage('pedido')
        let est = allEstoque.find((i)=> i.id == id)
        est.Status = "DEVOLVIDO"

        let editEstoque = editarLocalStorage('pedido',id,est)

        let Estoquenew = pegarLocalStorage('pedido')
        props.set(Estoquenew)

        Estoquenew.filter((item)=> {
            if(item.Status === "EMPRESTADO"){
                props.setAtrados(Estoquenew.filter((item)=> new Date(item.DataDevolucao) < new Date() && item.Status === "EMPRESTADO"))
            }
        })

        handleClose()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você Confirma a devolução do Livro?!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={()=>{handleRemoveAutor(props.id)}}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card className={'mb-2'} style={{background:'none',borderLeft:0, borderRight:0,borderTop:0,borderRadius:0}}>

                <ListGroup.Item

                    as="li"
                    style={{border:0,background:'none',color:'#244466'}}
                    variant={'flush'}
                    className="d-flex flex-row justify-content-between align-items-start"
                >


                    <div className={'d-flex flex-row justify-content-between '} style={{width:'100%'}}>
                        <div className="ms-2 me-4" style={{ width:400}}>
                            <div ><strong>Cliente:</strong> {props.Cliente}</div>
                            <strong>Livro:</strong> {props.Livro}
                            <div><strong>Data Devolução:</strong> {props.Data} </div>
                            <div><strong>Status:</strong> {props.Status} </div>

                        </div>




                        { props.Status !== "DEVOLVIDO" && <div className={'d-flex flex-row align-items-center'} >
                            <Button className="btn " onClick={handleShow} style={{background:'#007A7A',border:0, color:'#E6E6E6',height:'40px',marginRight:'10px'}}>
                                Devolver
                            </Button>

                        </div>
                        }

                    </div>


                </ListGroup.Item>

            </Card>
        </>

    )
}
export default CardPedidos;