import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
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
export const RouterComponent = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/Cartelera",
                    element: <Cartelera />
                },
                {
                    path: "/SeleccionarHorario",
                    element: <SeleccionarHorario />
                },
                {
                    path: "/SeleccionarAsientos/:horario/:pelicula",
                    element: <SeleccionarAsientos />
                },
                {
                    path: "/new-cartelera",
                    element: <NewCartelera />
                },
                {
                    path: "/usuarios",
                    element: <Usuarios />
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        
    ]);

    return (
        <RouterProvider router={router} />
    );
}