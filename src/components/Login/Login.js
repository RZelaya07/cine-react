import React, { useState ,useRef} from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { API_URL } from '../../shared/API_URL';
import { Loading } from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ConstructionOutlined } from '@mui/icons-material';
import "./card.css";
export const Login = (token, setToken, usuarioActivo, setUsuarioActivo) => {

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  localStorage.setItem('usuario',"");
  localStorage.setItem('token',"");
  const formRef1 = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(username);
    loginAPI(username, password);

  }
  
  const loginAPI = (usuario, clave) => {
    let tmpUsuario = {
        usuario,
        clave
    }
    setLoading(true)
    fetch(`${API_URL}/usuarios/login/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(tmpUsuario)
      })
        .then(response => {
            if(response.ok){
                return response.json();
            }else if(response.status === 404){
                return Promise.reject('error 404')
            }
            
        })
        .then(data => {
          console.log(data)
          setLoading(false)
          localStorage.setItem('usuario',JSON.stringify(data.usuario));
          localStorage.setItem('token',JSON.stringify(data.token));
          console.log(data.token+" el token guardado");
          navigate('/cartelera');
        })
        .catch(err => console.log(err))
  }

  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;

          default:;
      }
    };
  };

  
  return (
    <div>
        
    <Container className='mt-5'>
        <Card className='card m-auto'>
            <Card.Header>
                INICIAR SESION
            </Card.Header>
            <Card.Body>
            <Form onSubmit={handleSubmit} ref={formRef1}>
                <Form.Group className="mb-3" controlId="controlUsuario">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="name" placeholder="Usuario" value={username}  onChange={({target}) => setUsername(target.value)}/>
                    <Form.Text className="text-muted">
                
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="controlClave">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}  onChange={({target}) => setPassword(target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form> 
            
    
            </Card.Body>
        </Card>


        <Card className='card m-auto'>
            <Card.Body>
                ¿Notienes usuario?
                <Button className='ms-3' variant="primary" type="submit">
                Registrarse
            </Button>
            </Card.Body>

            </Card>
    </Container>
    </div>
  )
}
