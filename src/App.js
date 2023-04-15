import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import VmixControlPanel from './VmixControlPanel';
import ConnectionPage from './ConnectionPage';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Documentation from './Documentation';
import SecuredRoute from './router/SecuredRoute';
import PrivateRoute from './router/SecuredRoute';
import Root from './router';

export const ConnectionContext = createContext();

const App = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(false);
  }, []);

  return (
    <ConnectionContext.Provider value={[ connected, setConnected ]}>
      <Root/>
    </ConnectionContext.Provider>
  );
  
}

export default App;
