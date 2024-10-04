import React, { useContext } from 'react'
import context from './../../Context/context';
import { useNavigate } from "react-router-dom";

import logomarca from "../../assets/logomarca_dark.png"
import { ButtonTransparent } from '../Button';

import { FaPowerOff } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const { usuario } = useContext(context);

  const deslogarAcesso = () => {
    try{
      const data = {
        ...usuario,
        ultimoAcesso : new Date().toJSON()
      }

      fetch("http://localhost:3000/usuarios/" + usuario.id, {
        method : "PUT",
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify(data)
      });

      navigate("/")
    }catch(e){
      alert("Não foi possível sair da aplicação")
    }
  }

  return (
    // <header className='bg-emerald-200 p-5 col-span-10 col-start-2'>
    <header className='w-10/12 flex justify-between items-center'>
      <img src={logomarca} alt="" />

      <div className='flex items-center justify-center gap-5'>
        <a target='_blank' className='decoration-inherit' href={`http://github.com/${usuario.login}`} title={usuario.login} rel="noreferrer">
          <img className='w-[60px] rounded' src={usuario.imagem} alt="imagem do usuario logado" target="_blank" />
        </a>

        <ButtonTransparent onClick={deslogarAcesso} styles="border-primary-red"><FaPowerOff style={{ fill : "#BF0000"}}/></ButtonTransparent>
      </div>
    </header>
  )
}

export default Header
