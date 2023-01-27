import React, {useState, useEffect, useRef} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { API_URL } from '../../shared/API_URL';
import Form from 'react-bootstrap/Form';
export const Usuarios = () => {

  const [usuarios, setUsuarios] = useState([])
  const [usuarioEditar, setUsuarioEditar] = useState([])
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)
  const formRefCreditos = useRef(null)
  useEffect(() => {
        if (!loading) {
            fetch(`${API_URL}/usuarios`)
                .then(response => response.json())
                .then(data => setUsuarios(data));
        }
  
  }, [loading]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCreditos, setShowCreditos] = useState(false);
  const handleCloseCreditos = () => setShowCreditos(false);

  const handleShowCreditos = (usuarioE) =>{ 
    setShowCreditos(true)
    setUsuarioEditar(usuarioE);
    console.log(usuarioEditar);
};

  const handleSubmit = (event) => {
    event.preventDefault()

    let tmpUsuario = {
      nombre: event.target.inputNombre.value,
      apellido: event.target.inputApellido.value,
      identidad: event.target.inputIdentidad.value,
      usuario: event.target.inputUsuario.value,
      correo: event.target.inputCorreo.value,
      clave: event.target.inputClave.value,
      rol: event.target.inputRol.value,
      creditos: 300,
      estado: true
      // id: productos[productos.length - 1].id + 1
    }

    console.log(tmpUsuario);
    newUsuarioAPI(tmpUsuario)

    // setProductos([...productos, tmpProducto])
    formRef.current.reset()
  }

  const handleSubmitCreditos = (event) => {
    event.preventDefault()
    let creditosAdd = event.target.inputAddCreditos.value;
    let suma = Number(usuarioEditar.creditos)+Number(creditosAdd);
    console.log(usuarioEditar);
    let tmpUsuario = {
        _id: usuarioEditar._id,
        nombre: usuarioEditar.nombre,
        apellido: usuarioEditar.apellido,
        identidad: usuarioEditar.identidad,
        usuario: usuarioEditar.usuario,
        correo: usuarioEditar.correo,
        rol: usuarioEditar.rol,
        creditos: suma,
        estado: true
        // id: productos[productos.length - 1].id + 1
      }

    console.log(tmpUsuario);
    agregarCreditosAPI(tmpUsuario);

    // setProductos([...productos, tmpProducto])
    formRefCreditos.current.reset()
  }

  const newUsuarioAPI = (usuario) => {

    setLoading(true)

    fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const agregarCreditosAPI = (usuario) => {

    setLoading(true)

    fetch(`${API_URL}/usuarios/${usuario._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(usuario)
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
    <Container>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Registrar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>
                <Form onSubmit={handleSubmit} ref={formRef}>
                <div className='row'>
                <Form.Group className="mb-3 col-12" controlId="inputNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="inputApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Apellido" />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="inputIdentidad">
                    <Form.Label>Identidad</Form.Label>
                    <Form.Control type="text" placeholder="Identidad" />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="inputUsuario">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Usuario" />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="inputCorreo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="text" placeholder="Correo" />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="inputClave">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="inputRol">
                    <Form.Label>Rol de usuario</Form.Label>
                    <Form.Select aria-label="Default select example">
                    <option key="0">Tipo Usuario</option>
                    <option value="CLIENTE" key="1">Cliente</option>
                    <option value="ADMINISTRADOR" key="2">Administrador</option>
                    </Form.Select>    
                </Form.Group>

            </div>
            <div className='row justify-content-left mt-3'>
              <Button variant="primary" className='col-12' type="submit">
                Registrar Usuario
              </Button>
            </div>
          </Form>
          
          </Container>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

        <Modal show={showCreditos} onHide={handleCloseCreditos}>
            <Modal.Header closeButton>
            <Modal.Title>Agregar Creditos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>
                <Form onSubmit={handleSubmitCreditos} ref={formRefCreditos}>
                <div className='row'>
                <Form.Group className="mb-3 col-12" controlId="inputAddCreditos">
                    <Form.Label>Sumar Creditos</Form.Label>
                    <Form.Control type="text" placeholder="Cantidad a agregar" />
                </Form.Group>
            </div>
            <div className='row justify-content-left mt-3'>
              <Button variant="primary" className='col-12' type="submit">
                Agregar Creditos
              </Button>
            </div>
          </Form>
          
          </Container>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

        <Card>
            <Card.Body>
                <Button variant="primary" onClick={handleShow}>
                    Agregar Usuario
                </Button>
            </Card.Body>
        </Card>

        <br></br>
        <Table striped bordered hover>
            <thead>
                <tr>

                <th>Nombre</th>
                <th>Apellido</th>
                <th>Usuario</th>
                <th>Creditos</th>
                <th>Rol</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
            { 
                usuarios.map((usuario, index1) => (
                    <tr key={index1}>

                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.usuario}</td>
                    <td>{usuario.creditos}</td>
                    <td>{usuario.rol}</td>
                    <td>
                        <Button className="ml-4" onClick={() => handleShowCreditos(usuario)}>creditos</Button>
                        <Button className="ml-2">editar</Button>
                        <Button className="ml-1">borrar</Button>
                    </td>
                    </tr>
                ))
            } 
            
            </tbody>
        </Table>

    </Container>
    </>
  )
}
