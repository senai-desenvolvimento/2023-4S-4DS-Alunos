import logomarca from "./Assets/logomarca.png"

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import { Paragraph, Title } from './Components/Texts/index';
import { useEffect, useState } from "react";

function App() {
  const [statusRegister, setStatusRegister] = useState(true);

  return (
    <main className="h-screen flex lg:flex-row sm:flex-col">

      <section className={`flex flex-col items-center justify-center bg-atvGradient w-1/2 absolute h-screen transition-all duration-500 ${ statusRegister ? "left-[50%]" : "left-0"}`}>
        <Title styles="text-complementary-white">Bem-vindo ao <img className="mt-3" src={logomarca} alt="Ativements" /></Title>

        <Paragraph styles="text-complementary-white mt-16">
          A plataforma eficiente para gerenciar e acompanhar todos os recursos da escola SENAI Informática
        </Paragraph>
      </section>

      <Register onLinking={e => setStatusRegister(false)}/>

      <Login onLinking={e => setStatusRegister(true)}/>
    </main>
  );
}

export default App;