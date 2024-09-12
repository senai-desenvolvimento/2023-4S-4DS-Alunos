import React from 'react'

import { ButtonTransparent } from  "../Button"

const Table = ({ list }) => {
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
        {
          list.map( (item, index) => {
            return (
              <tr key={index} className='hover:bg-[#f1f0f5] hover:last:border-l-2 hover:border-primary-purple'>
                <td className='py-5 px-10 text-left'>{item.numero}</td>
                <td className='py-5 px-10 text-left'>{item.nome}</td>
                <td className='py-5 px-10 text-left'>{item.dataRegistro}</td>
                <td className='py-5 px-10 text-left flex gap-5'>
                  <ButtonTransparent styles="border-none py-0 px-0 text-[#009e9e]">Editar ativo</ButtonTransparent>

                  <ButtonTransparent styles="border-none py-0 px-0 text-primary-red">Remover ativo</ButtonTransparent>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Table
