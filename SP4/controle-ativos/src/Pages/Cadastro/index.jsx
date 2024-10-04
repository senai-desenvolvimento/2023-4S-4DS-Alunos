import React, { useState } from "react";

import { Paragraph, TextError, Title } from "../../Components/Texts/index";
import { FormAcess } from "../../Components/Form/index";
import { ButtonLink } from "../../Components/Button";

import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { octokit } from '../../Utils/apigithub';

const Cadastro = ({ setStatusRegistro, acessoUsuario }) => {
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [nomeAcesso, setNomeAcesso] = useState("");

  const CadastrarUsuario = (usuario) => {
    setMensagem("");

    try{
      const data = {
        id : uuid(),
        login : usuario.login.toLowerCase(),
        imagem : usuario.avatar_url,
        ultimoAcesso : null
      }

      fetch("http://localhost:3000/usuarios", {
        method : "POST",
        body : JSON.stringify(data)
      });
      
      // Salvando os dados dentro do localstorage
      acessoUsuario(data)

      //Redirecionando para tela de dashboard
      navigate("/painel-ativos")

    }catch(e){
      setMensagem("Não foi possível efetuar o registro, tente novamente")
    }
  }

  const ValidarUsuario = async (e) => {
    e.preventDefault();

    setLoad(true);
    await octokit.request("GET /users/{username}", {
      username : nomeAcesso,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }).then(async response => {
      if( await ProcurarUsuario(nomeAcesso) ){
        CadastrarUsuario(response.data)

      }else{
        setMensagem("Usuário já cadastrado")
      }
    }).catch(error => {
      setMensagem("Usuário não encontrado, tente novamente")
    });

    setLoad(false);
    setNomeAcesso("");
  }

  const ProcurarUsuario = (username) => {
    return fetch(`http://localhost:3000/usuarios?login=${username.toLowerCase()}`)
    .then(response => response.json())
    .then(response => {
      if(response.length > 0){
        return false;
      }
      return true;
    }).catch(error => {
      return false;
    });
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 sm:gap-4">
      <Title>Registrar-se na plataforma</Title>

      <Paragraph>
        Para criar uma conta, informe a url de acesso ao seu perfil da plataforma do Github
      </Paragraph>

      {/* Formulario de acesso */}
      <FormAcess
        placeholder="Registrar conta"
        onSubmit={ValidarUsuario} load={load}
        value={nomeAcesso} onChange={e => setNomeAcesso(e.target.value)}
      />

      <TextError>{mensagem}</TextError>

      <p className="text-xl">
        Já possui registro?
        <ButtonLink onClick={e => setStatusRegistro(false)}>acessar conta</ButtonLink>
      </p>
    </section>
  );
};

export default Cadastro;
