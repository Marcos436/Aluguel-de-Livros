import axios from "axios";
import Link from "next/link";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import Pagina from "../../components/Pagina";
import {editarLocalStorage, pegarLocalStorage, salvarLocalStorage} from "../../services/localstorage";
import Container from "react-bootstrap/Container";

const save = (props) => {
    const { reset ,register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [livros, setLivros] = useState([])


    useEffect(() => {
        let livrosData = pegarLocalStorage('livro')
        if(livrosData && !livros.length){
            setLivros(livrosData)
        }

        let estoque = pegarLocalStorage('estoque')
        if(estoque){
            let item = estoque.find((item) => item.id == props.id)
            reset(item)
        }

    },[])


    const handleUpload = (data) => {
        editarLocalStorage('estoque',props.id,data)
        router.push('/estoque')

    };

    return (
        <Pagina titulo="Gerenciamento de Estoque">
            <Row style={{ marginTop: '40px' }}>
                <Col xs={6} className='d-flex flex-column justify-content-center align-items-center text-center'>
                    <img  src={'/../box.png'} alt={'Humano com um Livro'} style={{width:300,height:200}} />
                </Col>
                <Col xs={6}>
                    <Form onSubmit={handleSubmit(handleUpload)}>
                        <Form.Group className="mb-3" controlId="Livro">
                            <Form.Label>Livro</Form.Label>
                            <Form.Control as="select" {...register("Livro", { required: true })} style={{ borderColor: "#244466" }}>
                                <option value="">Selecione um livro</option>
                                {livros.map((livros) => (
                                    <option key={livros.id} value={livros.id}>{livros.Titulo}</option>
                                ))}
                            </Form.Control>
                            {errors.Livro && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Quantidade">
                            <Form.Label>Quantidade disponível</Form.Label>
                            <Form.Control type="number" {...register("Quantidade", { required: true })} style={{ borderColor: "#244466" }} />
                            {errors.Quantidade && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Localizacao">
                            <Form.Label>Localização no estoque</Form.Label>
                            <Form.Control as="select"  {...register("Localizacao", { required: true })} style={{ borderColor: "#244466" }}>
                                <option value="Estoque Principal">Estoque Principal</option>
                                <option value="Estoque Secundário">Estoque Secundário</option>
                                <option value="Sub-solo">Sub-solo</option>
                            </Form.Control>
                        </Form.Group>


                        <div className="text-center">
                            <Button variant="success" type="submit" style={{ background: "#244466" }}>
                                <AiOutlineCheck className="me-1" />
                                Editar
                            </Button>
                            <Link href={"/estoque"} className="ms-2 btn btn-danger">
                                <IoMdArrowRoundBack className="me-1" />
                                Cancelar
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Pagina>
    );
};

export async function getServerSideProps(context) {

    const id = context.params.id


    return {
        props: { id },
    }
}

export default save;
