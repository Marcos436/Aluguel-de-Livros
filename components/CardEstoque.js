import ListGroup from "react-bootstrap/ListGroup";
import React, {useState} from "react";
import {Badge, Button, Card} from "react-bootstrap";
import Link from "next/link";
import {deletarLocalStorage, pegarLocalStorage} from "../services/localstorage";

import Modal from "react-bootstrap/Modal";
import {GrAdd} from "react-icons/gr";
import {MdGroupRemove} from "react-icons/md";
import {IoAdd, IoRemove} from "react-icons/io5";


const CardEstoque = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemoveOne = () => {
        let estoque = pegarLocalStorage('estoque')
        let livro = estoque.find((i)=> i.id == props.id)
        if(livro.Quantidade > 0){
            livro.Quantidade = parseInt(livro.Quantidade) - 1
            let index = estoque.findIndex((i)=> i.id == props.id)
            estoque[index] = livro
            deletarLocalStorage('estoque')
            localStorage.setItem('estoque', JSON.stringify(estoque))
            props.set(estoque)
        }
    }

    const handleAddOne = () => {
        let estoque = pegarLocalStorage('estoque')
        let livro = estoque.find((i)=> i.id == props.id)
        if(livro.Quantidade > 0){
            livro.Quantidade = parseInt(livro.Quantidade) + 1
            let index = estoque.findIndex((i)=> i.id == props.id)
            estoque[index] = livro
            deletarLocalStorage('estoque')
            localStorage.setItem('estoque', JSON.stringify(estoque))
            props.set(estoque)
        }
    }


    const handleRemoveEstoque = ()=>{
        deletarLocalStorage('estoque',props.id)
        let estoque = pegarLocalStorage('estoque')
        props.set(estoque)
        handleClose()
    }

    return (

        <>

            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você Realmente deseja Excluir esse registro?!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={()=>{handleRemoveEstoque(props.id)}}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card className={'mb-2'} style={{background:'none',borderLeft:0, borderRight:0,borderTop:0,borderRadius:0}}>

                <ListGroup.Item
                    key={props.id}
                    as="li"
                    style={{border:0,background:'none',color:'#244466'}}
                    variant={'flush'}
                    className="d-flex flex-row justify-content-between align-items-start"
                >


                    <div className={'d-flex flex-row justify-content-between '} style={{width:'100%'}}>
                        <div className="ms-2 me-4" style={{ width:300}}>
                            <div ><strong>Título:</strong> {props.Titulo}</div>
                            <strong>Autor:</strong> {props.allAutors.find((i)=> i.id == props.Autor) ? props.allAutors.filter((i)=> i.id == props.Autor)[0].Nome : 'Autor não encontrado'}
                            <div ><strong>Local:</strong> {props.Local}</div>
                        </div>

                        <div className={'d-flex flex-column align-items-center justify-content-between'} style={{ width:200}} >
                             <IoAdd size={'35px'} onClick={()=>{handleAddOne()}}/>
                            <Badge bg="secondary"> Qtd: {props.Estoque}</Badge>
                          <IoRemove  size={'35px'} onClick={()=>{handleRemoveOne()}}/>
                        </div>

                        <div className={'d-flex flex-row align-items-center'} >
                            <Link href={"/newestoque/" + props.id} className="btn"  style={{background:'#007A7A', color:'#E6E6E6',height:'40px',marginRight:'10px'}}>
                                Editar
                            </Link>

                            <Button className="btn btn-danger " onClick={handleShow} style={{ color:'#E6E6E6',height:'40px'}}>
                                Excluir
                            </Button>
                        </div>
                    </div>

                </ListGroup.Item>

            </Card>
        </>

    )
}
export default CardEstoque;