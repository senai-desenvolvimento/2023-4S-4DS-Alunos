import React from 'react'

import logomarca from "../../Assets/logomarca_dark.png"

import { FaPowerOff } from 'react-icons/fa'
import { ButtonTransparent } from '../Button'

const Header = () => {  
  return (
    <header className='w-full flex justify-between items-center py-5'>
      <img src={logomarca} alt="" />

      <div className='flex justify-center items-center gap-5'>
        <img className='w-15 rounded' src="" alt="Imagem de perfil do usuário logado" />

        <ButtonTransparent styles="border-primary-red"> <FaPowerOff fill="#bf0000" /> </ButtonTransparent>
      </div>
    </header>
  )
}

export default Header