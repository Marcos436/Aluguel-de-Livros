import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import Pagina from "../../components/Pagina";
import {pegarLocalStorage, salvarLocalStorage} from "../../services/localstorage";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const save = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [autores, setAutores] = useState([])

    useEffect(() => {
        let autor = pegarLocalStorage('autor')
        if(autor && !autores.length){
            setAutores(autor)
        }

    },[])
    const handleUpload = (item) =>{
        salvarLocalStorage('livro',item)
        router.push('/acervo')

    }

    return (
        <Pagina titulo="Cadastro de Livros">
            <Row style={{marginTop:'40px'}}>
                <Col xs={6} className='d-flex flex-column justify-content-center align-items-center text-center'>
                    <img  src={'/../HumanBlue.png'} alt={'Humano com um Livro'} />
                </Col>
                <Col xs={6}>
            <Form onSubmit={handleSubmit(handleUpload)}>
                <Form.Group className="mb-3" controlId="Titulo">
                    <Form.Label>Título do Livro</Form.Label>
                    <Form.Control type="text" {...register("Titulo", { required: true })}   style={{borderColor:"#244466"}}/>
                    {errors.Titulo && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="Autor">
                    <Form.Label>Autor do Livro</Form.Label>
                    <Form.Control as="select" {...register("Autor", { required: true })}  style={{borderColor:"#244466"}}>
                        <option value="">Selecione o Autor</option>
                        {autores.map((autor) => (
                            <option key={autor.id} value={autor.id}>{autor.Nome}</option>
                        ))}
                    </Form.Control>
                    {errors.Autor && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="Editora">
                    <Form.Label>Editora do Livro</Form.Label>
                    <Form.Control type="text" {...register("Editora", { required: true })}  style={{borderColor:"#244466"}}/>
                    {errors.Editora && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="Genero">
                    <Form.Label>Gênero do Livro</Form.Label>
                    <Form.Control as="select" {...register("Genero", { required: true })}  style={{borderColor:"#244466"}}>
                        <option value="">Selecione o Gênero</option>
                        <option value="Ação">Ação</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Comédia">Comédia</option>
                        <option value="Drama">Drama</option>
                        <option value="Ficção Científica">Ficção Científica</option>
                        <option value="Romance">Romance</option>
                    </Form.Control>
                    {errors.Genero && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="AnoPublicacao">
                    <Form.Label>Ano de Publicação do Livro</Form.Label>
                    <Form.Control type="number" {...register("AnoPublicacao", { required: true })}  style={{borderColor:"#244466"}}/>
                    {errors.AnoPublicacao && <span style={{ color: 'red', marginTop: 2 }}>Esse campo é obrigatório</span>}
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
