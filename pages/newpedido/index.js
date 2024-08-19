import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import Pagina from "../../components/Pagina";
import {deletarLocalStorage, pegarLocalStorage, salvarLocalStorage} from "../../services/localstorage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const ComponentePedido = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [clientes, setClientes] = useState([])
    const [livros, setLivros] = useState([])
    const [estoque, setEstoque] = useState([])

    useEffect(() => {
        let clientesData = pegarLocalStorage('cliente')
        if(clientesData && !clientes.length){
            setClientes(clientesData.reverse())
        }

        let livroData = pegarLocalStorage('livro')
        if(livroData && !livros.length){
            setLivros(livroData.reverse())
        }

        let estoqueData = pegarLocalStorage('estoque')
        if(estoqueData && !estoque.length) {
            setEstoque(estoqueData)
        }


    },[])

    const handleUpload = (pedido) => {

        let estoque = pegarLocalStorage('estoque')
        let livro = estoque.find((i)=> i.id == pedido.Livro)
        if(livro.Quantidade > 0){
            livro.Quantidade = parseInt(livro.Quantidade) - 1
            let index = estoque.findIndex((i)=> i.id == pedido.Livro)
            estoque[index] = livro
            deletarLocalStorage('estoque')
            localStorage.setItem('estoque', JSON.stringify(estoque))
        }
        pedido.Status = 'EMPRESTADO'
        salvarLocalStorage('pedido',pedido)
        router.push('/pedidos')
    };

    return (
        <Pagina titulo="Cadastrar Aluguel de Livros">
            <Row style={{ marginTop: "40px" }}>
                <Col xs={6} className='d-flex flex-column justify-content-center align-items-center text-center'>
                    <img src={'/../HumanBlue.png'} alt={'Humano com um Livro'} />
                </Col>
                <Col xs={6}>
                    <Form onSubmit={handleSubmit(handleUpload)}>
                        <Form.Group className="mb-3" controlId="Cliente">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control as="select" {...register("Cliente", { required: true })}  style={{borderColor:"#244466"}}>
                                <option value="">Selecione o Cliente</option>
                                {clientes.map((autor) => (
                                    <option key={autor.id} value={autor.id}>{autor.Nome}</option>
                                ))}
                            </Form.Control>
                            {errors.Autor && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Livro">
                            <Form.Label>Livro</Form.Label>
                            <Form.Control as="select" {...register("Livro", { required: true })}  style={{borderColor:"#244466"}}>
                                <option value="">Selecione o Livro</option>
                                {estoque.map((autor) => {
                                    let livro = livros.find(item => item.id === autor.Livro)
                                    return (
                                        <option key={livro.id} value={autor.id}>{livro.Titulo} (Qtd: {autor.Quantidade})</option>
                                    )
                                })}
                            </Form.Control>
                            {errors.Autor && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="DataDevolucao">
                            <Form.Label>Data de Devolução</Form.Label>
                            <Form.Control type="date" {...register("DataDevolucao", { required: true })} style={{ borderColor: "#244466" }} />
                            {errors.DataDevolucao && <span style={{ color: 'red', marginTop: 2 }}>Esses campos é obrigatório</span>}
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="success" type="submit" style={{ background: "#244466" }}>
                                <AiOutlineCheck className="me-1" />
                                Alugar
                            </Button>
                            <Link href="/newclientes">
                           <Button variant="primary" style={{ marginLeft: '10px' }}>
                             Cadastrar-se
                           </Button>
                           </Link>
                            <Link href={"/"} className="ms-2 btn btn-danger">
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

export default ComponentePedido;
