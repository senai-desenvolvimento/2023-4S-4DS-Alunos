import React, { useState } from "react";

import { Paragraph, TextError, Title } from "../../Components/Texts/index";
import { FormAcess } from "../../Components/Form/index";
import { ButtonLink } from "../../Components/Button";

import { useNavigate } from "react-router-dom";

const Login = ({ setStatusRegistro, acessoUsuario }) => {
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [nomeAcesso, setNomeAcesso] = useState("");
  const [mensagem, setMensagem] = useState("");

  const verificarAcesso = (e) => {
    e.preventDefault();
    setLoad(true);
    
    // Verificando o acesso dentro do servidor
    fetch(`http://localhost:3000/usuarios?login=${nomeAcesso.toLowerCase()}`)
    .then(response => response.json())
    .then(response => {
      if(response[0].login){
        setMensagem("");

        // Atualizar a informação dentro do context
        acessoUsuario({
          id: response[0].id,
          nome: response[0].nome,
          imagem: response[0].imagem,
          login: response[0].login,
        });
        
        //Redirecionando para tela de dashboard
        navigate("/painel-ativos");
        
      }else{
        setMensagem("Usuário não encontrado, tente novamente")
      }
    })
    .catch(error => { 
      setMensagem("Não foi possível efetuar o login, tente novamente")
    });
    
    // Limpando o campo digitado
    setLoad(false);
    setNomeAcesso("");
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 sm:gap-4">
      <Title>Entrar na plataforma</Title>

      <Paragraph styles="">
        Para acessar sua conta, informe seu usuário de acesso vículado ao Github
      </Paragraph>

      {/* Formulario de acesso */}
      <FormAcess
        placeholder="Acessar conta"
        onSubmit={verificarAcesso} load={load}
        value={nomeAcesso} onChange={e => setNomeAcesso(e.target.value)}
      />

      <TextError>{mensagem}</TextError>

      <p className="text-xl">
        Seu primeiro acesso?
        <ButtonLink onClick={e => setStatusRegistro(true)}>registrar conta</ButtonLink>
      </p>
    </section>
  );
};

export default Login;
