import React, { useEffect, useState } from 'react'
import Pagina from '../../components/Pagina'
import axios from 'axios'
import Link from 'next/link'
import {pegarLocalStorage} from "../../services/localstorage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from "next/router";
import ListGroup from 'react-bootstrap/ListGroup';
import AutorCard from '../../components/CardAutor'
import { Button, Form } from "react-bootstrap";
import CardCliente from "../../components/CardCliente";



const index = () => {
    const router = useRouter();
    const [clientes, setClientes] = useState([])
    const [searchClient, setSearchClient] = useState([])


    useEffect(() => {
        let clientesData = pegarLocalStorage('cliente')
        if(clientesData && !clientes.length){
            setClientes(clientesData ? clientesData.reverse(): [])
        }


    },[])

    return (
        <div>

            <Pagina titulo="Clientes Cadastrados" >

                <Row >

                    <Col xs={6} style={{paddingRight:'50px'}}>
                        <Form.Label htmlFor="inputName">Pesquise Pelo nome</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputName"
                            aria-describedby="passwordHelpBlock"
                            onChange={(e)=> {
                                if (e.target.value === '') {
                                    setSearchClient([])
                                    return
                                } else {

                                    let itemFilters = clientes.filter((item) => {
                                        if (item.Nome.includes(e.target.value)) {
                                            return true
                                        } else {
                                            return false
                                        }
                                    })
                                    setSearchClient(itemFilters)
                                }
                            }

                        }

                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Você pode pesquisar pelo nome do cliente
                        </Form.Text>

                        <ListGroup as="ol" className="my-2"  variant={'flush'}>
                            {searchClient.map((item)=>{
                                return (
                                    <CardCliente
                                                   key={item.id}
                                                   Endereco={item.Endereco}
                                                   Email={item.Email}
                                                   id={item.id}
                                                   Nome={item.Nome}
                                                   Telefone={item.Telefone}
                                                   DataNascimento={item.DataNascimento}
                                                   set={setClientes}
                                    />)
                            })
                            }
                        </ListGroup>

                    </Col>


                    <Col xs={6} style={{paddingLeft:'50px'}}>
                        <Link href={"/newclientes"} className="btn btn-outline-success mb-3 p-1 mt-2"  style={{background:'#007A7A', color:'#E6E6E6',fontWeight:500}}>
                            Novo Cliente
                        </Link>
                        <div><h6>Total De Registros: {clientes.length}</h6></div>
                        <ListGroup as="ol" className="my-2"  variant={'flush'} style={{overflow:'scroll',height:'72vh',overflowX:'hidden'}}>
                            {clientes.map((item)=>{
                                return (
                                    <CardCliente
                                                 key={item.id}
                                                 Endereco={item.Endereco}
                                                 Email={item.Email}
                                                 id={item.id}
                                                 Nome={item.Nome}
                                                 Telefone={item.Telefone}
                                                 DataNascimento={item.DataNascimento}
                                                 set={setClientes}
                                    />)
                            })
                            }
                        </ListGroup>

                    </Col>

                </Row>
            </Pagina>
        </div>
    )
}

export default index;
