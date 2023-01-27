import React, { useState, useEffect } from 'react'
import { API_URL } from '../../shared/API_URL';
import { Navigation } from '../Navigation/Navigation'
import { Outlet, Route, Routes, useLocation,useNavigate  } from 'react-router-dom'

export const Home = () => {

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(!localStorage.getItem('token')){
        navigate('/login');
    }
  }, []);
  return (
    <>
      <Navigation/>
      <Outlet/>
    </>
  )
}
