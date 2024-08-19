import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import Pagina from "../../components/Pagina";
import {salvarLocalStorage} from "../../services/localstorage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const save = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUpload = (item) =>{
        salvarLocalStorage('autor',item)
        router.push('/acervo')
    }

    return (
        <Pagina titulo="Cadastro de Autores">

            <Row style={{marginTop:'40px'}}>
                <Col xs={6} className='d-flex flex-column justify-content-center align-items-center text-center'>
                    <img  src={'/../HumanBlue.png'} alt={'Humano com um Livro'} />
                </Col>
                <Col xs={6}>
                    <Form onSubmit={handleSubmit(handleUpload)}>
                        <Form.Group className="mb-3" controlId="Nome">
                            <Form.Label>Nome do Autor</Form.Label>
                            <Form.Control type="text" {...register("Nome", { required: true })}  style={{borderColor:"#244466"}}/>
                            {errors.Nome && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="DataNascimento">
                            <Form.Label>Data de Nascimento do Autor</Form.Label>
                            <Form.Control type="date" {...register("DataNascimento", { required: true })} style={{borderColor:"#244466"}} />
                            {errors.DataNascimento && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="PaisOrigem">
                            <Form.Label>País de Origem do Autor</Form.Label>
                            <Form.Control type="text" {...register("PaisOrigem", { required: true })} style={{borderColor:"#244466"}} />
                            {errors.PaisOrigem && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email do Autor</Form.Label>
                            <Form.Control type="email" {...register("Email", { required: true })} style={{borderColor:"#244466"}}/>
                            {errors.Email && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Endereco">
                            <Form.Label>Endereço do Autor</Form.Label>
                            <Form.Control type="text" {...register("Endereco", { required: true })} style={{borderColor:"#244466"}} />
                            {errors.Endereco && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>


                        <div className="text-center">
                            <Button variant="success" type="submit" style={{background:"#244466"}}>
                                <AiOutlineCheck className="me-1" />
                                Adicionar
                            </Button>
                            <Link href={"/acervo"} className="ms-2 btn btn-danger">
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

export default save;
