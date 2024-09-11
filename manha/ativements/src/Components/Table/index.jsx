import React from 'react'

import { ButtonTransparent } from  "../Button"

const Table = () => {
  return (
    <table className='w-full mt-10'>
      <thead>
        <tr className='rounded bg-[#e1e0e7]'>
          <th className='py-5 px-10 text-left'>Identificação do ativo</th>
          <th className='py-5 px-10 text-left'>Nome do ativo</th>
          <th className='py-5 px-10 text-left'>Data do registro</th>
          <th className='py-5 px-10 text-left'>Ações do ativo</th>
        </tr>
      </thead>

      <tbody>
        <tr className='hover:bg-[#f1f0f5] hover:last:border-l-2 hover:border-primary-purple'>
          <td className='py-5 px-10 text-left'>1234567890</td>
          <td className='py-5 px-10 text-left'>Cadeira de escritório</td>
          <td className='py-5 px-10 text-left'>10/09/2024 08:11</td>
          <td className='py-5 px-10 text-left flex gap-5'>
            <ButtonTransparent styles="border-none py-0 px-0 text-[#009e9e]">Editar ativo</ButtonTransparent>

            <ButtonTransparent styles="border-none py-0 px-0 text-primary-red">Remover ativo</ButtonTransparent>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table
