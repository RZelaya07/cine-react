import React, { useEffect, useRef, useState  } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { API_URL } from '../../shared/API_URL';
import { Loading } from '../Loading/Loading';

export const NewCartelera = () => {
    const [peliculas, setPeliculas] = useState([])
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null)

    useEffect(() => {
      if (!loading) {
          fetch(`${API_URL}/peliculas`)
              .then(response => response.json())
              .then(data => setPeliculas(data));
      }

  }, [loading]);
  
  const handleSubmit = (event) => {
        event.preventDefault()
    
        let tmpPelicula = {
          nombre: event.target.inputNombre.value,
          banner: event.target.inputBanner.value,
          poster: event.target.inputPoster.value,
          estado: true
          // id: productos[productos.length - 1].id + 1
        }
    
        newPeliculaAPI(tmpPelicula)
    
        // setProductos([...productos, tmpProducto])
        formRef.current.reset()
      }

     

      const newPeliculaAPI = (pelicula) => {

        //setLoading(true)
    
        fetch(`${API_URL}/peliculas`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(pelicula)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setLoading(false)
          })
          .catch(err => console.log(err))
      }
  return (
    <>
      {
        loading ?
          <Loading />
          :
          <Container>
            <Form onSubmit={handleSubmit} ref={formRef}>
            <div className='row'>
              <Form.Group className="mb-3 col-7" controlId="inputNombre">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" placeholder="Pelicula..." />
              </Form.Group>
              <Form.Group className="mb-3 col-7" controlId="inputBanner">
                <Form.Label>Banner Imagen</Form.Label>
                <Form.Control type="text" placeholder="http:// ..." />
              </Form.Group>
              <Form.Group className="mb-3 col-7" controlId="inputPoster">
                <Form.Label>Poster Imagen</Form.Label>
                <Form.Control type="text" placeholder="http:// ..." />
              </Form.Group>
            </div>
            <div className='row justify-content-left mt-3'>
              <Button variant="primary" className='col-7' type="submit">
                Agregar Pelicula
              </Button>
            </div>
          </Form>
          
          </Container>
      }
    </>
  )
}
