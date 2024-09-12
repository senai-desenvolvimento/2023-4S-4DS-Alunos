import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { octokit } from "../../Utils/githubkey"
import { v4 as uuid } from "uuid"

import { Paragraph, TextError, Title } from '../../Components/Texts'
import { ButtonLink } from '../../Components/Button'
import { FormAccess } from '../../Components/Forms'

const Register = ({ onLinking, setUser }) => {
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [userAccess, setUserAccess] = useState("");

  // Validando o usuario de acordo com o nick de acesso do github
  const validateUser = (e) => {
    e.preventDefault();

    setLoad(true);
    octokit.request("GET /users/{username}", {
      username : userAccess,
      headers : {
        'X-GitHub-Api-Version' : "2022-11-28"
      }
    }).then(async response => {
      const verify = await checkUserExists()

      if(!verify){
        registerUser(response.data)

      }else{
        setMessage("Usuário já cadastrado")
      }  
    }).catch( () => {
      setMessage("Usuário não encontrado, tente novamente")
    });

    setLoad(false);
    setUserAccess("")
  }

  // Verificar se o usuário já está cadastrado
  const checkUserExists = () =>{
    return fetch(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`)
    .then(response => response.json())
    .then(response => {
      if( response.length > 0 ){
        return true;
      }

      return false;
    }).catch( () => {
      alert("Não foi possível encontrar o usuario")
    })
  }

  // Funcao para cadastrar o usuario
  const registerUser = (user) => {
    setMessage("");

    try{
      const data = {
        id: uuid(),
        login : user.login.toLowerCase(),
        imagem : user.avatar_url
      }

      fetch("http://localhost:3000/usuarios", {
        method : "POST",
        body : JSON.stringify(data)
      });

      setUser(data) // Estou alimentando os dados do usuario no context

      navigate("/painel-ativos")
    }catch{
      setMessage("Não foi possível efetuar o registro, teste sua conexão com a internet")
    }
  }

  return (
    <section className='flex flex-1 flex-col items-center justify-center gap-8'>
      <Title>Registrar-se na plataforma</Title>

      <Paragraph>Para criar uma conta, informe a url de acesso ao seu perfil da plataforma do Github</Paragraph>

      {/* Formulario de cadastro */}
      <FormAccess
        load={load}
        onSubmit={validateUser}
        textButton="Cadastrar conta"

        value={userAccess}
        onChange={e => setUserAccess(e.target.value)}
      />

      <TextError>{message}</TextError>

      <Paragraph>Já possui registro? <ButtonLink onClick={onLinking}>acessar conta</ButtonLink></Paragraph>
    </section>
  )
}

export default Register
