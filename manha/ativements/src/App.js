import { useState } from "react";
import logomarca from "./Assets/logomarca.png"

import { Paragraph, Title } from "./Components/Texts";
import Login from "./Pages/Login";

import Register from "./Pages/Register";

function App({ setUser }) {
  const [left, setLeft] = useState("")

  return (
    <main className="flex h-screen sm:flex-col md:flex-row">

      <section className={`flex flex-col items-center justify-center bg-atvGradient w-[50%] absolute h-screen transition-all duration-500 ${left}`}>
        <Title styles="text-complementary-white">
          Bem-vindo ao <img className="mt-3" src={logomarca} alt="Ativements" />
        </Title>

        <Paragraph styles="text-complementary-white mt-[60px]">
          A plataforma eficiente para gerenciar e acompanhar todos os recursos da escola SENAI Informática
        </Paragraph>
      </section>

      <Register onLinking={e => setLeft("left-[0%]")} setUser={setUser} />

      <Login onLinking={e => setLeft("left-[50%]")} setUser={setUser} />
    </main>
  );
}

export default App;
