import { useContext, useState } from "react";
import { Button, ButtonTransparent } from "../Button";
import { Input } from './../Input/index';
import context from "../../Context/context";

import { v4 as uuid } from "uuid";

export const FormAccess = ({ textButton, onSubmit, value, onChange, load }) => {
  return (
    <form onSubmit={onSubmit} className="w-[40%]">
      <Input styles="w-full" id="campoFormulario" value={value} onChange={onChange}>Usuário de acesso</Input>

      <Button load={load} styles="w-full mt-4">{textButton}</Button>
    </form>
  )
}

export const FormAtivement = () => {
  const { user } = useContext(context);
  const [ativement, setAtivement] = useState({
    numero : "",
    nome : "",
    local : ""
  })

  const createAtivement = (e) => {
    e.preventDefault();

    try{
      const data = {
        ...ativement,
        id : uuid(),
        usuario_id : user.id,
        dataRegistro : new Date().toLocaleString(),
        status : true
      }

      fetch("http://localhost:3000/ativos", {
        method : "POST",
        body : JSON.stringify(data)
      })

    }catch{
    }
  }

  return (
    <form onSubmit={createAtivement} className="bg-[#D9D3F6] w-full py-5 px-10 mt-6 rounded flex justify-between items-end shadow-md">
      <Input styles="w-[20%]" id="numeroativo" value={ativement.numero} onChange={e => setAtivement({...ativement, numero : e.target.value})}>Número do ativo</Input>

      <Input styles="w-[20%]" id="nomeativo" value={ativement.nome} onChange={e => setAtivement({ ...ativement, nome : e.target.value})}>Nome do ativo</Input>

      <Input styles="w-[20%]" id="localativo" value={ativement.local} onChange={e => setAtivement({...ativement, local : e.target.value})}>Local do ativo</Input>

      <ButtonTransparent styles="w-[15%] border-primary-blue text-primary-blue">Limpar campos</ButtonTransparent>

      <Button styles="w-[15%]">Inserir ativo</Button>
    </form>
  )
}