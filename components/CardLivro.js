import ListGroup from "react-bootstrap/ListGroup";
import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import Link from "next/link";
import {deletarLocalStorage, pegarLocalStorage} from "../services/localstorage";
import { useRouter } from "next/navigation";
import Modal from "react-bootstrap/Modal";


const CardLivro = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemoveAutor = (id) => {
        deletarLocalStorage('livro',id)
        // router.refresh()
        let allLivros = pegarLocalStorage('livro')
        props.set(allLivros)
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
                    <Button variant="danger" onClick={()=>{handleRemoveAutor(props.id)}}>
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
                    <div className="ms-2 me-4" style={{ width:400}}>
                        <div ><strong>Título:</strong> {props.Titulo}</div>
                        <strong>Autor:</strong> {props.allAutors.find((i)=> i.id == props.Autor) ? props.allAutors.filter((i)=> i.id == props.Autor)[0].Nome : 'Autor não encontrado'}
                        <div ><strong>Ano Publ.:</strong> {props.AnoPublicacao}</div>
                    </div>
                    <div className="ms-2 me-4 overflow-hidden" style={{ width:400,textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>
                        <div><strong>Genero:</strong> {props.Genero} </div>
                        <strong>Editora:</strong> {props.Editora}
                    </div>

                    <div className={'d-flex flex-row align-items-center'} >
                        <Link href={"/livro/" + props.id} className="btn"  style={{background:'#007A7A', color:'#E6E6E6',height:'40px',marginRight:'10px'}}>
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
export default CardLivro;