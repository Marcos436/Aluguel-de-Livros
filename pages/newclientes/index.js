import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagina from "../../components/Pagina";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {salvarLocalStorage} from "../../services/localstorage";
import { mask, unMask } from 'remask'


const Cliente = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const router = useRouter();

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        const mascara = event.target.getAttribute('mask')
  
        setValue(name, mask(value, mascara))
    }

    const handleUpload = (data) => {
        salvarLocalStorage('cliente',data)
        router.push('/clientes')
    };
    const validatePhone = (value) => {
        const onlyNumbers = unMask(value);    // Remove todos os caracteres não numéricos
        if (onlyNumbers.length !== 11) {
            return 'Número de telefone inválido';
        }
        return true;
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
                        <Form.Group className="mb-3" controlId="Emai61l">
                            <Form.Label>Email do Cliente</Form.Label>
                            <Form.Control type="email" {...register("Email", { required: true })} style={{ borderColor: "#244466" }} />
                            {errors.Email && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Telefone">
                            <Form.Label>Número de telefone do Cliente</Form.Label>
                            <Form.Control type="text" mask="(99)99999-9999" {...register("Telefone", { required: true, validate: validatePhone })} style={{ borderColor: "#244466" }} onChange={handleChange} />
                            {errors.Telefone && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório{errors.Telefone ? errors.Telefone.message : ''}</span>}
                        </Form.Group>
                        <div className="text-center">
                           <Link  href={"/"} className="ms-2 btn btn-danger me-4">
                                <IoMdArrowRoundBack />
                                Cancelar
                            </Link>
                            <Button variant="success" type="submit" style={{ background: "#244466" }}>
                                <AiOutlineCheck className="me-1" />
                                Cadastrar
                            </Button>        
                        </div>
                    </Form>
                </Col>
            </Row>
        </Pagina>
    );
};

export default Cliente;
