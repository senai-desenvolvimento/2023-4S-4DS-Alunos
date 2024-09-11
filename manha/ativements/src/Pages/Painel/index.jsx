import React from 'react'
import Header from '../../Components/Header'
import { FormAtivement } from '../../Components/Forms'
import Tabs from '../../Components/Tabs'
import Table from '../../Components/Table'

const Painel = () => {
  return (
    <div className='w-10/12 mx-auto my-0'>
      <Header />
      
      {/* Formulário de ativo */}
      <FormAtivement />

      {/* tabs - locais dos ativos */}
      <Tabs />

      <Table />
    </div>
  )
}

export default Painel
