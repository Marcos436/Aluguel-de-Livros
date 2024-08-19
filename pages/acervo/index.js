import React, { useEffect, useState } from 'react'
import Pagina from '../../components/Pagina'
import Link from 'next/link'
import {pegarLocalStorage} from "../../services/localstorage";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from "next/router";
import ListGroup from 'react-bootstrap/ListGroup';
import AutorCard from '../../components/CardAutor'
import CardLivro from "../../components/CardLivro";



const index = () => {
  const router = useRouter();
  const [autor, setAutor] = useState([])
  const [livros, setLivro] = useState([])

  useEffect(() => {
    let autorData = pegarLocalStorage('autor')
    if(autor && !autor.length){
      setAutor(autorData ? autorData.reverse(): [])
    }
    let livrosData = pegarLocalStorage('livro')
    if(livros && !livros.length) {
      setLivro(livrosData ? livrosData.reverse(): [])
    }

  },[])

  return (
    <div>

      <Pagina titulo="Acervo" >

        <Row >

          <Col xs={6} style={{paddingRight:'50px'}}>

            <Link href={"/livro"} className="btn btn-outline-success mb-3 p-1 mt-2" style={{background:'#007A7A', color:'#E6E6E6',fontWeight:500}}>
              Novo Livro
            </Link>
            <div><h6>Total De Registros: {livros.length}</h6></div>

            <ListGroup as="ol" className="my-2"  variant={'flush'} style={{overflow:'scroll',height:'72vh',overflowX:'hidden'}}>
              {livros.map((item)=>{
                return (
                    <CardLivro
                        key={item.id}
                        Titulo={item.Titulo}
                        Autor={item.Autor}
                        Genero={item.Genero}
                        Editora={item.Editora}
                        AnoPublicacao={item.AnoPublicacao}
                        allAutors={autor}
                        id={item.id}
                        set={setLivro}
                     />
                )
              })
              }
            </ListGroup>

          </Col>


          <Col xs={6} style={{paddingLeft:'50px'}}>
            <Link href={"/autor"} className="btn btn-outline-success mb-3 p-1 mt-2"  style={{background:'#007A7A', color:'#E6E6E6',fontWeight:500}}>
              Novo Autor
            </Link>
            <div><h6>Total De Registros: {autor.length}</h6></div>
            <ListGroup as="ol" className="my-2"  variant={'flush'} style={{overflow:'scroll',height:'72vh',overflowX:'hidden'}}>
              {autor.map((item)=>{
                return (
                    <AutorCard
                                 key={item.id}
                                 Endereco={item.Endereco}
                                 Email={item.Email}
                                 id={item.id}
                                 Nome={item.Nome}
                                 Origem={item.PaisOrigem}
                                 DataNascimento={item.DataNascimento ? new Date(item.DataNascimento).toLocaleDateString('en-GB'): ''}
                                 PaisOrigem={item.PaisOrigem}
                                 set={setAutor}
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
