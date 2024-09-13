import logomarca from "./assets/logomarca.png";

import { Paragraph, Title } from "./Components/Texts/index";

import Login from './Pages/Login';
import Cadastro from "./Pages/Cadastro";
import { useState } from "react";

function App({ acessoUsuario }) {
  const [statusRegistro, setStatusRegistro] = useState(true);

  return (
    <main className="flex lg:flex-row flex-1 h-screen bg-complementary-white flex-col">
      {/* Criando o painel de aprensentacao */}
      <div className={`flex flex-col items-center justify-center bg-atvGradient transition-[1s] absolute
        lg:h-screen lg:w-[50%] h-[50%] md:w-full ${statusRegistro ? "lg:left-[50%] lg:top-0 md:left-0 md:top-[50%]" : "lg:left-0 lg:top-0 md:left-0 md:top-0"}`}>
        <Title styles="text-complementary-white">
          Bem-vindo ao
          <img className="mt-3 w-[100%]" src={logomarca} alt="Ativements" />
        </Title>

        <Paragraph styles="text-complementary-white mt-[60px]">
          A plataforma eficiente para gerenciar e acompanhar todos os recursos
          da escola SENAI Informática
        </Paragraph>
      </div>

      {/* Importando a tela de login */}
      <Cadastro setStatusRegistro={setStatusRegistro} acessoUsuario={acessoUsuario} />
      <Login setStatusRegistro={setStatusRegistro} acessoUsuario={acessoUsuario} />
    </main>
  );
}

export default App;
