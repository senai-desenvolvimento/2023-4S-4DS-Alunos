import { useContext, useState } from "react";
import context from "../../Context/userContext";

import { v4 as uuid } from "uuid"

import { Button, ButtonTransparent } from "../Button";
import { Input, Select } from './../Input/index';

export const FormAccess = ({ textButton, value, onChange, onSubmit, load }) => {
  return (
    <form onSubmit={onSubmit} className="w-[40%]">
      <Input id="camporegistro" value={value} onChange={onChange}>Usuário de acesso</Input>

      <Button load={load} styles="w-full mt-4">{textButton}</Button>
    </form>
  )
}

export const FormAtivement = ({ list, setList, places, setPlaces }) => {
  const { user } = useContext(context);
  const [ativement, setAtivement] = useState({ 
    nome : "",
    numero : "",
    local : ""
  });

  const createAtivement = async (event) => {
    event.preventDefault();

    // Validar se o local existe, ou se precisa cadastrar
    const localid = await findLocal(ativement.local)

    try{
      const data = {
        ...ativement,
        local : localid,
        id : uuid(),
        dataRegistro : new Date().toLocaleString(),
        usuario_id : user.id,
        status : true
      }

      fetch("http://localhost:3000/ativos", {
        method : "POST",
        body : JSON.stringify(data)
      });

      // Adicionando na lista de ativos, o novo ativo inserido
      setList([ ...list, data])

    }catch{
      alert("Não foi possível registrar o ativo")
    }
  }

  const findLocal = (local) => {
    return fetch("http://localhost:3000/locais?nome=" + local)
          .then(response =>response.json())
          .then(response => {
            // Se não tiver um item no banco, registrar um novo local
            if(response.length === 0){
              return createLocal(local);

            }else{ // Caso ele exista, retorne o id do local
              return response[0].id
            }
          }).catch(() => {
            alert("Não foi encontrado o local")
          })
  }

  const createLocal = (local) => {
    try{
      const data = {
        id : uuid(),
        nome : local
      }

      fetch("http://localhost:3000/locais", {
        method : "POST",
        body : JSON.stringify(data)
      })

      // Insere nas tabs o novo local cadastrado
      setPlaces([ ...places, data ])

      return data.id

    }catch{
      alert("Não foi possível registrar o novo local")
    }
  }

  return (
    <form onSubmit={createAtivement} className="bg-[#D9D3F6] w-full py-5 px-10 mt-2 rounded flex justify-around items-end shadow-md">

      <Input styles="w-[20%]" id="numeroativo" value={ativement.numero} onChange={e => setAtivement({...ativement, numero : e.target.value})}>Número do ativo</Input>
      
      <Input styles="w-[20%]" id="nomeativo" value={ativement.nome} onChange={e => setAtivement({...ativement, nome : e.target.value})}>Nome do ativo</Input>
      
      <Select places={places} styles="w-[20%]" id="localativo" value={ativement.local} onChange={e => setAtivement({...ativement, local : e.target.value})}>Local do ativo</Select>

      <ButtonTransparent styles="w-[15%] text-primary-blue border-primary-blue">Limpar campos</ButtonTransparent>

      <Button styles="w-[15%]">Inserir ativo</Button>

    </form>
  )
}