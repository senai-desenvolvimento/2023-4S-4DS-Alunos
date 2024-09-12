import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import context from '../../Context/userContext'

import { Paragraph, TextError, Title } from '../../Components/Texts'
import { ButtonLink } from '../../Components/Button'
import { FormAccess } from '../../Components/Forms'

const Login = ({ onLinking }) => {
  const { setUser } = useContext(context) // Importando dentro do contexto, a funcao de alimentar os dados do usuario 
  
  const navigate = useNavigate()
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [userAccess, setUserAccess] = useState("");

  useEffect(() => {
    setUser({}) // Limpando o acesso do usuario no context
  }, [])

  useEffect(() => {
    if(message){
      setTimeout(() => {
        setMessage("")
      }, 5000)
    }
  }, [message])

  const verifyAccess = (e) => {
    e.preventDefault();

    setLoad(true);
    fetch(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`)
    .then(response => response.json())
    .then(response => {
      if(response[0]){
        setUser(response[0]) // Alimento os dados do user para o context da aplicacao

        navigate("/painel-ativos")
      }else{
        setMessage("Usuário não encontrado, tente novamente")
      }
    }).catch(() => {
      setMessage("Não foi possível efetuar o login, tente novamente")
    });

    setLoad(false);
    setUserAccess("")
  }

  return (
    <section className='flex flex-1 flex-col items-center justify-center gap-8'>
      <Title>
        Entrar na plataforma
      </Title>

      <Paragraph>
        Para acessar sua conta, informe seu usuário de acesso vículado ao Github
      </Paragraph>

      {/* Formulario de acesso */}
      <FormAccess
        load={load}
        onSubmit={verifyAccess}

        value={userAccess}
        onChange={e => setUserAccess(e.target.value)}

        textButton="Acessar conta"
      />

      {/* Exibindo as mensagens de erro */}
      <TextError>{message}</TextError>

      {/* O onLinking - alimentando o state para o container de gradiente - vai para o click do botao de link */}
      <Paragraph>Seu primeiro acesso? <ButtonLink onClick={onLinking}>registrar conta</ButtonLink></Paragraph>
    </section>
  )
}

export default Login
