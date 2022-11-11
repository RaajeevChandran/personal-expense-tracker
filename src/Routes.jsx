import React from 'react';
import {
    Route,
    Routes,
    BrowserRouter as Router
  } from 'react-router-dom';
import Home from './pages/home/home';

const AppRoutes = () => (
    <Router>
      <Routes>
      <Route  path={'/home'} element={<Home/>} />
      <Route exact path={'/'} element={<Home/>} />
      </Routes>  
    </Router>
  );
  
  export default React.memo(AppRoutes);