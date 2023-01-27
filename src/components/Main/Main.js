import { Home } from '../Home/Home'
import React, {useState,useEffect} from 'react'
import { Route, Routes, useLocation  } from 'react-router-dom'
import { SeleccionarAsientos } from '../Salas/SeleccionarAsientos'
import { Cartelera } from '../Cartelera/Cartelera'
import { Navigation } from '../Navigation/Navigation'
import { SeleccionarHorario } from '../Salas/SeleccionarHorario'
import { NewCartelera } from '../Cartelera/NewCartelera'
import { API_URL } from '../../shared/API_URL';
import { useNavigate } from 'react-router-dom';
import { Usuarios } from '../Usuarios/Usuarios'
import { Login } from '../Login/Login'
export const Main = () => {

  const [token, setToken] = useState('');
  const [usuarioActivo, setUsuarioActivo] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    
    if(location.pathname !== "/login"){
      const usuarioF = localStorage.getItem('usuario');
      const tokenF = localStorage.getItem('token');
      console.log(tokenF+" el token");
      if( tokenF && token.length >0){
        let usuariotmp = {
          tokenF
        }
        
        fetch(`${API_URL}/usuarios/token`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(usuariotmp)
        })
          .then(response => {
              if(response.ok){
                  return response.json();
              }else if(response.status === 404){
                  localStorage.setItem('usuario',"");
                  localStorage.setItem('token',"");
                  return Promise.reject('error 404')
              }
              
          })
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err+" error111")
            
        })
    }else{
      //navigate('/login');
    }
    }

  }, [location]);
  return (
    <>
      <Navigation/>
            <Routes>
                <Route path='/' element= {<Home/>}/>
                <Route path='/ComprarAsientos' element= {<SeleccionarAsientos token={token} setToken={setToken} usuarioActivo={usuarioActivo} setUsuarioActivo={setUsuarioActivo} />}/>
                <Route path='/Cartelera' element= {<Cartelera token={token} setToken={setToken} usuarioActivo={usuarioActivo} setUsuarioActivo={setUsuarioActivo}/>}/>
                <Route path='/SeleccionarHorario' element= {<SeleccionarHorario/>}/>
                <Route path='/SeleccionarAsientos' element= {<SeleccionarAsientos/>}/>
                <Route path='/new-cartelera' element= {<NewCartelera/>}/>
                <Route path='/usuarios' element= {<Usuarios/>}/>
                <Route path='/login' element= {<Login token={token} setToken={setToken} usuarioActivo={usuarioActivo} setUsuarioActivo={setUsuarioActivo}/>}/>
            </Routes>      
    </>
  )
}
