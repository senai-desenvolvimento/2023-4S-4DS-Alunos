import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import context from './../Context/context';

import App from '../App';
import Painel from "../Pages/Painel";
import { useState } from "react";

export const RoutesPage = () => {
  const [user, setUser] = useState({});

  const ProtectRoute = ({ children }) => {
    return user.login ? children : <Navigate to="/" />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App setUser={setUser} />} path="/"/>

        <Route element={
          <context.Provider value={{ user, setUser }}>
            <ProtectRoute>
              <Painel />
            </ProtectRoute>
          </context.Provider>
        } path="/painel-ativos" />

        {/* Configuracao para evitar error de rota */}
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes>+
    </BrowserRouter>
  )
}