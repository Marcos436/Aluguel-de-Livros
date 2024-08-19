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
import CardPedidos from "../../components/CardPedidos";



const index = () => {

    const [pedidos, setPedidos] = useState([])
    const [pedidosAtivos, setPedidosAtivos] = useState([])
    const [livros, setLivro] = useState([])
    const [clientes, setClientes] = useState([])
    const [estoque, setEstoque] = useState([])

    useEffect(() => {

        let clientesData = pegarLocalStorage('cliente')
        if(clientesData && !clientes.length){
            setClientes(clientesData ? clientesData.reverse() :[])
        }

        let pedidosData = pegarLocalStorage('pedido')
        if(pedidosData && !pedidos.length){
            pedidosData.filter((item)=> {

                setPedidos(pedidosData.reverse())
                if(item.Status === "EMPRESTADO"){
                    setPedidosAtivos(pedidosData.filter((item)=> new Date(item.DataDevolucao) < new Date() && item.Status === "EMPRESTADO"))
                }
            })

        }
        let livrosData = pegarLocalStorage('livro')
        if(livros && !livros.length) {
            setLivro(livrosData ? livrosData.reverse(): [])
        }

        let estoqueData = pegarLocalStorage('estoque')
        if(estoqueData && !estoque.length) {
            setEstoque(estoqueData)
        }

    },[pedidosAtivos])

    return (
        <div>
            <Pagina titulo="Pedidos" >

                <Row >

                    <Col xs={6} style={{paddingRight:'50px',marginTop:'50px'}}>
                        <div><h6>Pedidos Atrasados: {pedidosAtivos.length}</h6></div>

                        <ListGroup as="ul"   className="my-2"  variant={'flush'} style={{overflow:'scroll',height:'72vh',overflowX:'hidden'}}>
                            {pedidosAtivos.map((item)=>{
                                let cliente = clientes.find((livro)=>livro.id === item.Cliente)
                                let estoquef = estoque.find((livro)=>livro.id === item.Livro)
                                let livro
                                if(estoquef){
                                    livro = livros.find((livro)=>livro.id === estoquef.Livro)
                                }


                                return (
                                    <CardPedidos
                                        key={item.id}
                                        Cliente={cliente.Nome ? cliente.Nome : 'Cliente não encontrado'}
                                        Livro={livro ? livro.Titulo : 'Livro não encontrado'}
                                        Data={new Date(item.DataDevolucao).toLocaleDateString('en-GB')}
                                        id={item.id}
                                        set={setPedidos}
                                        Status={item.Status}
                                        setAtrados={setPedidosAtivos}
                                    />
                                )
                            })
                            }
                        </ListGroup>
                    </Col>


                    <Col xs={6} style={{paddingLeft:'50px'}}>
                        <Link href={"/newpedido"} className="btn btn-outline-success mb-3 p-1 mt-2"  style={{background:'#007A7A', color:'#E6E6E6',fontWeight:500}}>
                            Nova Solicitação
                        </Link>
                        <div><h6>Pedidos em Dia: {pedidos.length}</h6></div>
                        <ListGroup as="ul"   className="my-2"  variant={'flush'} style={{overflow:'scroll',height:'72vh',overflowX:'hidden'}}>
                            {pedidos.map((item)=>{
                                let cliente = clientes.find((livro)=>livro.id === item.Cliente)
                                let estoquef = estoque.find((livro)=>livro.id === item.Livro)
                                let livro = false
                                if(estoquef){
                                     livro = livros.find((livro)=>livro.id === estoquef.Livro)
                                }

                                return (
                                    <CardPedidos
                                        key={item.id}
                                        Cliente={cliente ? cliente.Nome : 'Cliente não encontrado'}
                                        Livro={livro ? livro.Titulo : 'Livro não encontrado'}
                                        Data={new Date(item.DataDevolucao).toLocaleDateString('en-GB')}
                                        id={item.id}
                                        set={setPedidos}
                                        Status={item.Status}
                                        setAtrados={setPedidosAtivos}

                                    />
                                )
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
