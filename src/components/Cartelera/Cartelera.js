import React, { useState, useEffect } from 'react'
import {carteleras} from '../../shared/carteleras';
import './cartelera.css'
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../../shared/API_URL';
import { Loading } from '../Loading/Loading';
export const Cartelera = () => {

  //const [peliculas, setPeliculas] = useState(carteleras);

  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
        if (!loading) {
            fetch(`${API_URL}/peliculas`)
                .then(response => response.json())
                .then(data => setPeliculas(data));
        }
  
  }, [loading]);

  //console.log(peliculas)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items:2,
      slidesToSlide: 2 // optional, default to 1.
    }
  };
  return (
    <>

    <div className='carousel'>
        <Carousel>
        { 
            peliculas.map((pelicula, index1) => (
                <Carousel.Item interval={3000} key={index1}>
                    <img
                    className=" w-100 "
                    src={pelicula.banner}
                    style={{height: '580px', objectFit:'cover' }}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>{pelicula.nombre}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            ))
        }  
        </Carousel>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Row>
            <div className="d-grid gap-2">
                <Button className="botonComprarBoletos" variant="primary" size="lg" active>
                <Link className='nav-link' to="/SeleccionarHorario"> Ver Cartelera</Link>
                </Button>
            </div>
        </Row>


    </div>
    <div>
        
    </div>
    </>

  )
}
