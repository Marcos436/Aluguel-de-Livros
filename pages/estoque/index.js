import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Pagina from "../../components/Pagina";
import {pegarLocalStorage} from "../../services/localstorage";
import ListGroup from "react-bootstrap/ListGroup";
import CardEstoque from "../../components/CardEstoque";
import Link from "next/link";
import dynamic from 'next/dynamic'

const Estoque = () => {
    const [autor, setAutor] = useState([])
    const [livros, setLivro] = useState([])
    const [estoque, setEstoque] = useState([])
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
    useEffect(() => {
        let autorData = pegarLocalStorage('autor')
        if(autor && !autor.length){
            setAutor(autorData ? autorData.reverse(): [])
        }
        let livrosData = pegarLocalStorage('livro')
        if(livrosData && !livros.length) {
            setLivro(livrosData ? livrosData.reverse(): [])
        }
        let estoqueData = pegarLocalStorage('estoque')
        if(estoqueData && !estoque.length) {
            setEstoque(estoqueData)
        }

    },[])
    let  sta = {
            chart: {
                type: 'polarArea',
            },
            stroke: {
                colors: ['#fff']
            },
            labels:['Estoque Principal','Estoque Secundário','Sub-solo'],
            fill: {
                opacity: 0.8
            },

            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
        title: {
            text: 'Estoque',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize:  '14px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238'
            },
        }
    };
    const quantidadeTotalEstoquePrincipal = estoque.reduce((total, item) => item.Localizacao === "Estoque Principal" ? parseInt(total) + parseInt(item.Quantidade) : total, 0);
    const quantidadeTotalEstoqueSecundario = estoque.reduce((total, item) => item.Localizacao === "Estoque Secundário" ? parseInt(total) + parseInt(item.Quantidade) : total, 0);
    const quantidadeTotalSubsolo = estoque.reduce((total, item) => item.Localizacao === "Sub-solo" ? parseInt(total) + parseInt(item.Quantidade) : total, 0);
    return (
        <div>
            <Pagina titulo="Estoque" >
            <Row>
                <Col xs={6} >

                    <div  style={{width:'100%',height:'100%',marginTop:50}} className="d-flex flex-column justify-content-center align-items-center" >
                        <Chart   style={{width:'100%',height:'100%'}} options={sta} series={[quantidadeTotalEstoquePrincipal, quantidadeTotalEstoqueSecundario, quantidadeTotalSubsolo]} type="polarArea" />
                    </div>

                </Col>
                <Col xs={6}>
                    <Link href={"/newestoque"} className="btn btn-outline-success mb-3 p-1 mt-2" style={{background:'#007A7A', color:'#E6E6E6',fontWeight:500}}>
                        Nova Unidade
                    </Link>
                    <ListGroup as="li"   className="my-2"  variant={'flush'} style={{overflow:'scroll',height:'72vh',overflowX:'hidden'}}>
                        {estoque.map((item)=>{
                            let livro = livros.find((livro)=>livro.id === item.Livro)
                            return (
                                    <CardEstoque
                                        key={item.id}
                                        Titulo={livro.Titulo}
                                        Autor={livro.Autor}
                                        Estoque={item.Quantidade}
                                        Local={item.Localizacao}
                                        allAutors={autor}
                                        id={item.id}
                                        set={setEstoque}
                                    />
                            )
                        })
                        }
                    </ListGroup>
                </Col>
            </Row>

            </Pagina>
        </div>
    );
}
export default Estoque;