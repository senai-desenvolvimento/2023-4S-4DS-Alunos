import React, { useContext, useEffect, useState } from 'react'
import context from '../../Context/context';
import { v4 as uuid } from "uuid";

import { Input, Select } from '../Input/index'
import {Button, ButtonTransparent} from '../Button'

import LoadingSpinner from './../LoadIcon/index';

export const FormAcess = ({ onSubmit, load, value, onChange, placeholder }) => {
  return (  
    <form onSubmit={onSubmit} className='md:w-[40%] sm:w-[60%]'>
      <Input styles="w-full" id="campoLogin" value={value} onChange={onChange}>Usuário de acesso</Input>

      <Button disabled={load} styles="mt-[15px] w-full">{ load ? <LoadingSpinner /> : placeholder}</Button>
    </form>
  )
}

export const FormAtivement = ({ labels, setLabels, ativos, setAtivos, ativiment }) => {
  const { usuario } = useContext(context);
  const [load, setLoad] = useState(false);
  const [ativo, setAtivo] = useState({
    numero: "",
    nome: "",
    local_id: "",
  });

  const adicionarAtivo = async (e) => {
    e.preventDefault();

    // Iniciando o load e limpando as mensagens
    setLoad(true);

    // Procurando o local informado
    const local = await procurarLocal(ativo.local_id);

    // Criando o objeto com os dados do ativo
    const data = {
      ...ativo,
      local_id : local,
      dataRegistro: new Date().toJSON(),
      usuario_id: usuario.id,
      status : true,
      id : uuid()
    };

    try {
      fetch("http://localhost:3000/ativos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Adicionando o elemento a listagem
      setAtivos([...ativos, data]);

    } catch (e) {
      alert("Não foi possível inserir o ativo");
    }

    limparCampos();
  };

  const atualizarAtivo = async (e) => {
    e.preventDefault();

    // Iniciando o load e limpando as mensagens
    setLoad(true);
    
    try {
      // Procurando o local informado
      const local = await procurarLocal(ativo.local_id);

      // Criando o objeto com os dados do ativo
      const data = {
        ...ativo,
        local_id : local,
        dataAlteracao : new Date().toJSON(),
        usuarioAlteracao : usuario.id
      };

      fetch("http://localhost:3000/ativos/" + ativo.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Adicionando o elemento a listagem
      setAtivos(ativos.map( item => 
        item.id === ativo.id
          ? data
          : item
      ))

    } catch (e) {
      alert("Não foi possível inserir o ativo");
    }

    limparCampos();
  }

  const limparCampos = () => {
    setAtivo({
      numero: "",
      nome: "",
      local_id: "",
    })
  }

  const procurarLocal = (local) => {
    const response = fetch("http://localhost:3000/locais?nome=" + local)
    .then((response) => response.json())
    .then(async (response) => {
      if(!response[0]){
        return await registrarLocal(local);
      }

      return response[0].id
    })
    .catch( error => {
      alert("Local não foi encontrado")
    });

    return response;
  }  

  const registrarLocal = async (local) => {
    try{
      const data = {
        id : uuid(),
        nome : local
      }

      await fetch("http://localhost:3000/locais", {
        method : "POST",
        headers : { 
          'Content-Type' : "application/json"
        },
        body : JSON.stringify(data),
      });

      // Inserindo a nova label
      setLabels([...labels, data])

      return data.id
    }catch{
      alert("Não foi possível inserir o novo local informado")
    }
  }

  useEffect(() => {
    setAtivo(ativiment)
  }, [ativiment])

  return (
    <form onSubmit={e => !ativo.id ? adicionarAtivo(e) : atualizarAtivo(e)} className='bg-[#D9D3F6] w-10/12 py-5 px-10 mt-8 rounded flex justify-between items-end shadow-sm'>
      <Input disabled={!!ativo.id} styles="w-[20%]" id="numeroAtivo" value={ativo.numero} onChange={e => setAtivo({ ...ativo, numero : e.target.value})}>
        Número do ativo
      </Input>

      <Input styles="w-[20%]" id="numeroAtivo" value={ativo.nome} onChange={e => setAtivo({ ...ativo, nome : e.target.value})}>
        Nome do ativo
      </Input>

      <Select styles="w-[20%]" id="localAtivo" value={ativo.local_id} onChange={e => setAtivo({ ...ativo, local_id : e.target.value})} options={labels}>
        Local do ativo
      </Select>

      <ButtonTransparent onClick={limparCampos} styles="w-[15%] border-2 border-primary-blue text-primary-blue">Limpar campos</ButtonTransparent> 

      <Button load={load} styles="w-[15%]">Inserir ativo</Button>   
    </form>
  )
}
