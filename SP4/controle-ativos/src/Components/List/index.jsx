import React from 'react'
import { ButtonTransparent } from '../Button'
import { Paragraph } from '../Texts'

const List = ({ listaAtivos, setAtivos, setAtiviment }) => {

  // Funcao para remover o ativo da lista
  const removerAtivo = (ativo) => {
    try {
      const data = {
        ...ativo,
        status : !ativo.status
      }

      fetch(`http://localhost:3000/ativos/${ativo.id}`, {
        method : "PUT",
        headers : { 
          'Content-Type' : "application/json"
        },
        body : JSON.stringify(data)
      });

      // Atualizando a lista de ativos
      setAtivos(listaAtivos.map( item => 
        item.id === ativo.id
          ? data
          : item
      ))

    }catch(e){
      alert("Não foi possível inativar o ativo");
    }
  }

  // Funcao para capturar os dados do ativo da lista
  const receberAtivo = async (ativo) => {    
    setAtiviment({...ativo, local_id :  await procurarLocal(ativo.local_id)});
  }

  const procurarLocal = (local) => {
    const response = fetch("http://localhost:3000/locais?id=" + local)
    .then(response => response.json())
    .then(response => {
      return response[0].nome
    })
    .catch( error => {
      alert("Local não foi encontrado")
    });

    return response;
  }  

  return (
    <>
      <table className='w-10/12 mt-[40px]'>
        <thead>
          <tr className='rounded bg-[#E1E0E7]'>
            <th className='py-5 px-10 text-left'>Identificação ativo</th>
            <th className='py-5 px-10 text-left'>Nome do ativo</th>
            <th className='py-5 px-10 text-left'>Data do registro</th>
            <th className='py-5 px-10 text-left'>Ações do ativo</th>
          </tr>
        </thead>

        <tbody>
          {
            listaAtivos.map( (item, index) => {
              return (
                <tr key={index} className='hover:bg-[#F1F0F5] hover:border-l-2 hover:border-primary-purple'>
                  <td className={`py-5 px-10 text-left ${!item.status && "line-through text-[#666]"}`}>{item.numero}</td>
                  <td className={`py-5 px-10 text-left ${!item.status && "line-through text-[#666]"}`}>{item.nome}</td>
                  <td className={`py-5 px-10 text-left ${!item.status && "line-through text-[#666]"}`}>{new Date(item.dataRegistro).toLocaleString()}</td>
                  <td className='py-5 px-10 text-left flex gap-5'>
                    <ButtonTransparent styles="border-none py-0 px-0 text-[#009E9E]" onClick={e => receberAtivo(item)}>Alterar ativo</ButtonTransparent>
                    <ButtonTransparent styles="border-none py-0 px-0 text-primary-red" onClick={e => removerAtivo(item)}>{ item.status ? "Remover" : "Inserir" } ativo</ButtonTransparent>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        listaAtivos.length === 0 && <Paragraph styles="w-full p-3">Nenhum ativo encontrado</Paragraph>
      }
    </>
  )
}

export default List
