import React from 'react'
import { Paragraph } from '../Texts'

const Tabs = ({ labels, labelActive, setLabelActive }) => {
  return (
    <section className='w-10/12 max-w-10/12 flex flex-row flex-wrap mt-10 gap-5'>
      {
        labels.length
        ? labels.map( (item, index) => { 
            return (
              <div key={index} className={labelActive === item.id && "border-b-2 border-primary-blue text-primary-blue"}>
                <a onClick={e => setLabelActive(item.id)} className='decoration-none p-5 w-[200px] text-center h-full flex items-center justify-center font-semibold cursor-pointer'>{item.nome}</a>
              </div>
            )
          })
        : (
          <Paragraph styles="text-start">Nenhum local encontrado</Paragraph>
        )
      }
    </section>
  )
}

export default Tabs
