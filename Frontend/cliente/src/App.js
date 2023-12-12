import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CrearEvento from './pages/CrearEvento';
import axios from 'axios';

const App = () => {
  axios.get("https://prueba-parcial.vercel.app/api/usuarios");
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/crear-evento" element={<CrearEvento></CrearEvento>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;
