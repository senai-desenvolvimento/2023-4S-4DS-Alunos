import React, { useContext } from 'react'
import context from '../../Context/context'
import { useNavigate } from 'react-router-dom'

import logomarca from "../../Assets/logomarca_dark.png"

import { FaPowerOff } from 'react-icons/fa'
import { ButtonTransparent } from '../Button'

const Header = () => {  
  const { user, setUser } = useContext(context) // Chamando dentro do contexto do projeto, os dados do usuario
  const navigate = useNavigate();

  const logoutUser = () => {
    try{
      // Criando o objeto com os dados do usuario para enviar na requisição
      const data = {
        ...user,
        ultimoAcesso : new Date().toJSON()
      }

      // Atualizando os dados do usuario no banco de dados
      fetch("http://localhost:3000/usuarios/" + user.id, {
        method : "PUT",
        body : JSON.stringify(data)
      });

      setUser({})
      navigate("/")

    }catch{
      alert("Não foi possível, sair da aplicação")
    }
  }

  return (
    <header className='w-full flex justify-between items-center py-5'>
      <img src={logomarca} alt="" />

      <div className='flex justify-center items-center gap-5'>
        <a target='_blank' href={`https://github.com/${user.login}`} rel="noreferrer">
          <img className='w-16 rounded' src={user.imagem} alt="Imagem de perfil do usuário logado" />
        </a>

        <ButtonTransparent onClick={logoutUser} styles="border-primary-red"> <FaPowerOff fill="#bf0000" /> </ButtonTransparent>
      </div>
    </header>
  )
}

export default Header