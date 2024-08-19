import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagina from "../../components/Pagina";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {editarLocalStorage, pegarLocalStorage, salvarLocalStorage} from "../../services/localstorage";

const Cliente = (props) => {
    const { reset ,register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    useEffect(() => {

        let clientesData = pegarLocalStorage('cliente')
        if(clientesData){
            let item = clientesData.find((item) => item.id == props.id)
            reset(item)
        }

    },[])


    const handleUpload = (data) => {
        editarLocalStorage('cliente',props.id,data)
        router.push('/clientes')

    };
    return (
        <Pagina titulo="Cadastro de Clientes">
            <Row style={{ marginTop: '40px' }}>
                <Col xs={6} className='d-flex flex-column justify-content-center align-items-center text-center'>
                    <img  src={'/../HumanBlue.png'} alt={'Humano com um Livro'} />
                </Col>
                <Col xs={6}>
                    <Form onSubmit={handleSubmit(handleUpload)}>
                        <Form.Group className="mb-3" controlId="Nome">
                            <Form.Label>Nome do Cliente</Form.Label>
                            <Form.Control type="text" {...register("Nome", { required: true })} style={{ borderColor: "#244466" }} />
                            {errors.Nome && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Endereco">
                            <Form.Label>Endereço do Cliente</Form.Label>
                            <Form.Control type="text" {...register("Endereco", { required: true })} style={{ borderColor: "#244466" }} />
                            {errors.Endereco && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email do Cliente</Form.Label>
                            <Form.Control type="email" {...register("Email", { required: true })} style={{ borderColor: "#244466" }} />
                            {errors.Email && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Telefone">
                            <Form.Label>Número de telefone do Cliente</Form.Label>
                            <Form.Control type="tel" {...register("Telefone", { required: true })} style={{ borderColor: "#244466" }} />
                            {errors.Telefone && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="success" type="submit" style={{ background: "#244466" }}>
                                <AiOutlineCheck className="me-1" />
                                Editar
                            </Button>
                            <Link href={"/clientes"} className="ms-2 btn btn-danger">
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


export default Cliente;
