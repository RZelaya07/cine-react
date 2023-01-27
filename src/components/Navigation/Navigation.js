import React from 'react'
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export const Navigation = () => {

 const usuarioA =  JSON.parse(localStorage.getItem('usuario'));
 console.log(usuarioA);
    return (
        <Navbar bg='dark' variant="dark" className='mb-3'>
            <Container>
                <Navbar.Brand href="/cartelera">coliseum</Navbar.Brand>
                <Nav className="ml-auto">
                    <Link className='nav-link' to="/cartelera">Horarios</Link>
                    <Link className='nav-link' to="/cine">Próximos estrenos</Link>
                    
                    <div>
                    {
                    
                    usuarioA.rol.toLowerCase() === "administrador" ? (
                        <div className='d-flex'>
                            <Link className='nav-link' to="/usuarios">Usuarios</Link>  
                            <Link className='nav-link' to="/new-cartelera">Agregar Cartelera</Link>
                        </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                        
                    <Link className='nav-link' to="/login">Logout</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
