import React, { useState, useContext } from 'react'

import context from '../../Context/userContext'
import { v4 as uuid } from "uuid"
import { octokit } from "../../Utils/githubkey"
import { useNavigate } from 'react-router-dom'

import { Paragraph, TextError, Title } from '../../Components/Texts'
import { ButtonLink } from '../../Components/Button'
import { FormAccess } from '../../Components/Forms'

const Register = ({ onLinking }) => {
  const { setUser } = useContext(context); // Importando dentro do contexto, a funcao de alimentar os dados do usuario
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [userAccess, setUserAccess] = useState("");

  // Função para validar o perfil do github
  const validateUser = (e) => {
    e.preventDefault();

    setLoad(true);
    octokit.request("GET /users/{username}", {
      username : userAccess,
      headers : {
        "X-GitHub-Api-Version" : "2022-11-28"
      }
    }).then( async response => {
      const verify = await checkUserExists()

      if( verify ){
        setMessage("Usuário já cadastrado ")
      }else{
        registerUser( response.data )
      }

    }).catch( () => {
      setMessage("Usuário inválido, tente novamente")
    });

    setLoad(false);
    setUserAccess("")
  }

  // Função para verificar se o usuário já está registrado
  const checkUserExists = () => {
    return fetch(`http://localhost:3000/usuarios?login=${userAccess.toLocaleLowerCase()}`)
    .then(response => response.json())
    .then(response => {
      if( response.length > 0 ){
        return true;
      }
      return false;
    }).catch(() => {
      alert("Não foi possível consultar o usuário")
    })
  }

  // Função para registrar o usuário
  const registerUser = (user) => {
    try{
      const data = {
        id : uuid(),
        login : user.login.toLocaleLowerCase(),
        imagem : user.avatar_url
      }

      fetch("http://localhost:3000/usuarios", {
        method : "POST",
        body : JSON.stringify(data)
      });

      setUser(data)
      navigate("/painel-ativos")
    }catch(e){
      setMessage("Não foi possível registrar o usuário, tente novamente");
    }
  }

  return (
    <section className='flex flex-1 flex-col items-center justify-center gap-8'>
      <Title>
        Registrar-se na plataforma
      </Title>

      <Paragraph>
        Para criar uma conta, informe a url de acesso ao seu perfil da plataforma do Github
      </Paragraph>

      {/* Formulario de acesso */}
      <FormAccess
        load={load}
        onSubmit={validateUser}

        value={userAccess}
        onChange={e => setUserAccess(e.target.value)}

        textButton="Cadastrar conta"
      />

      {/* Exibindo as mensagens de erro */}
      <TextError>{message}</TextError>

      {/* O onLinking - alimentando o state para o container de gradiente - vai para o click do botao de link */}
      <Paragraph>Já possui registro? <ButtonLink onClick={onLinking}>acessar conta</ButtonLink></Paragraph>
    </section>
  )
}

export default Register
