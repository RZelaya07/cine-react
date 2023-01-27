import React, {  useEffect,  useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {carteleras} from '../../shared/carteleras';
import { Col, Container, Row } from 'react-bootstrap';
import './Cine.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../../shared/API_URL';
import { Loading } from '../Loading/Loading';
import Card from 'react-bootstrap/Card';

export const SeleccionarHorario = () => {

    const [peliculas, setPeliculas] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!loading) {
            fetch(`${API_URL}/peliculas`)
                .then(response => response.json())
                .then(data => setPeliculas(data));
        }
  
    }, [loading]);
  return (
    <>
    <div>Seleccionar Horario</div>
    <div className='row justify-content-center'>
      {
        loading ? <Loading/>
        :
        <Row>
            {
                <Container>

                <Row className='mt-2'>
                {
                    peliculas.map((pelicula, index1) => (  
                        

                    <Col md={{ span: 4}} key= {index1} className='horario mt-5'>
                        <Card bg = {'dark'} >
                            <Card.Body>
                                <div className=' d-flex justify-content-center '>
                                    <img
                                    className="d-block "
                                    src={pelicula.poster}
                                    alt="First slide"
                                    style={{height: '450px', objectFit:'contain'}}
                                    />
                                    
                                </div>
                                <h3 className='text-center'>{pelicula.nombre}</h3> 
                                <Row className="filahorario justify-content-center x ">  
                                <Button className="botonHorario" variant="primary">
                                <Link className='nav-link'  to={`/SeleccionarAsientos/8-30/${pelicula._id}`}>8:30</Link>
                                </Button>
                                </Row>

                                <Row className="row t-5 justify-content-center  filahorario"> 
                                <Button className="botonHorario" variant="primary">
                                <Link className='nav-link'  to={`/SeleccionarAsientos/10-00/${pelicula._id}`}>10:00</Link>
                                </Button>
                                </Row>
                                
                                <Row className="filahorario justify-content-center filahorario">
                                
                                <Button className="botonHorario" variant="primary">
                                <Link className='nav-link' to={`/SeleccionarAsientos/12-30/${pelicula._id}`}>12:30</Link>
                                </Button>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                        
                    ))
                }
                </Row>
                </Container>
            }
  
        </Row>

    
    }
    </div>
    </>

    //hacer la cuadricula de 2 peliculas por fila con sus horarios abajo y al dar click seleccionaran
    //en que horario y luego los asientos 
  )
}


