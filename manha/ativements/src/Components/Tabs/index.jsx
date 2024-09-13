import React from 'react'

import { Paragraph } from "../Texts"

const Tabs = ({ places, setSelectedPlace, selectedPlace }) => {
  return (
    <div className='w-full flex mt-10 gap-5'>
      {
        places.length
          ? places.map( (item, index) => {
              return (
                <div key={index} className={ selectedPlace === item.id && 'border-b-2 border-primary-blue text-primary-blue box-border'}>
                  
                  <a onClick={e => setSelectedPlace(item.id)} className='decoration-none p-5 w-[200px] text-xl text-center font-semibold cursor-pointer flex justify-center items-center'>
                    {item.nome}
                  </a>

                </div>
              )
            })
          : <Paragraph styles="text-start">Nenhum local encontrado</Paragraph>
      }
    </div>
  )
}

export default Tabs
