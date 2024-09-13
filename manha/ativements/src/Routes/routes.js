import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import context from "./../Context/context";

import App from "../App";
import Painel from "../Pages/Painel";

// Criando a navegação das rotas do sistema
export const RoutesPages = () => {
  const [usuario, setUsuario] = useState({});

  // Criando o acesso da rota protegida
  const ProtectedRoute = ({ children }) => {
    return usuario.login ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App acessoUsuario={setUsuario} />} path="/" exact />

        <Route
          element={
            <context.Provider value={{ usuario }}>
              {/* <ProtectedRoute> */}
                <Painel />
              {/* </ProtectedRoute> */}
            </context.Provider>
          }
          path="/painel-ativos"
        />

        {/* Atalho para corrigir erros */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPages;
