import React from 'react'

import { Paragraph } from "../Texts"

const Tabs = ({ places, setSelectedPlace, selectedPlace}) => {
  return (
    <ul className='list-none w-full flex gap-5 mt-10'>
      {
        places.length
          ? places.map( (item, index) => {
              return (
                <li className={ selectedPlace === item.id && 'border-b-2 border-primary-blue text-primary-blue'}>
                  <a onClick={e => setSelectedPlace(item.id)} className='p-5 text-center w-[200px] font-semibold text-lg flex justify-center cursor-pointer'>
                    {item.nome}
                  </a>
                </li>
              )
            })
          : <Paragraph>Nenhum local encontrado</Paragraph>
      }
    </ul>
  )
}

export default Tabs
