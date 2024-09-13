import { useContext, useEffect, useState } from "react";
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

export const FormAtivement = ({ list, setList, places, setPlaces, update, setUpdate }) => {
  const { user } = useContext(context);
  const [ativement, setAtivement] = useState({ 
    nome : "",
    numero : "",
    local : ""
  });

  // Quando houver um mucança nos dados do update, vamos passar os valores para o ativement
  useEffect(() => { 
    const local = places.filter(x => x.id === update.local)

    if(local[0]){
      // o local = filtro de locais com o id do local do ativo a ser atualizado, onde retornamos somente o nome
      setAtivement({ ...update, local : local[0].nome})

      // Limpando o objeto update
      setUpdate({})
    }
  }, [update])

  const clearInput = () =>{
    setAtivement({ nome : "", numero : "", local : ""})
  }

  const updateAtivement = async () => {
    try{
      // Procurar pelo local informado
      const localid = await findLocal(ativement.local)

      const data = {
        ...ativement,
        local : localid,
        dataAlteracao : new Date().toLocaleString(),
        usuarioAlteracao : user.id
      }

      fetch("http://localhost:3000/ativos/" + ativement.id, {
        method : "PUT",
        body : JSON.stringify(data)
      })

      // Atualizar na lista de visualização, os novos dados do ativo
      setList( list.map( item => item.id === ativement.id ? data : item ) )

    }catch{
      alert("Não foi possível atualizar os dados do ativo")
    }
  }

  const validateData = async (e) => {
    e.preventDefault();

    // Armazenando a validacao do numero do ativo
    const numeroEmUso = await validadeNumberAtivement()
    
    // Verificar se os campos estão vazios (mesmo com espacos)
    if( ativement.nome.trim() == "" || ativement.local.trim() == "" ){
      alert("Campos em branco, favor preenche-los");

    }else if(ativement.numero.length != 7){
      // Limite de caracteres para o numero do ativo == 7
      alert("Numeração do ativo com tamanho inválido, favor utilizar somente 7 caracteres")
      
    }else if(ativement.nome.length < 2){
      // Limite de caracteres para o nome do ativo > 2
      alert("Nome do ativo com poucos caracteres, informar ao menos 2 caracteres")
    
    }else if( /[!@#\$%\^\&*\)\(+=._-]+/.test(ativement.nome) ){
      // Verificar se o item contem caracteres especiais
      alert("O nome não podem conter caracteres especiais")
      
    }else if( /[^\w]+/g.test(ativement.local)){
      // Verificar se o item contem caracteres especiaisf
      alert("O local não podem conter caracteres especiais")
      
    }else if(numeroEmUso && !ativement.id){
      // Verificar se o numero do ativo já existe e não estou alterando o meu ativo
      alert("O número do ativo já está cadastrado, informe outro número")

    }else{
      // Senão existir o id ativo, ele cadastro
      if( !ativement.id ){
        createAtivement()

      }else{ // Se houver, ele atualiza
        updateAtivement()
      }
    }
  }

  const validadeNumberAtivement = () => {
    return fetch("http://localhost:3000/ativos?numero=" + ativement.numero)
    .then(response => response.json())
    .then(response => {
      if(response[0]){
        return true;
      }
      return false
    }).catch( () => {
      return false
    })
  }

  const createAtivement = async (event) => {
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
          .then(async response => {
            // Se não tiver um item no banco, registrar um novo local
            if(response.length === 0){
              return await createLocal(local);

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
    <form onSubmit={validateData} className="bg-[#D9D3F6] w-full py-5 px-10 mt-2 rounded flex justify-around items-end shadow-md">

      <Input disabled={!!ativement.id} type="number" styles="w-[20%]" id="numeroativo" value={ativement.numero} onChange={e => setAtivement({...ativement, numero : e.target.value})}>Número do ativo</Input>
      
      <Input type="text" styles="w-[20%]" id="nomeativo" value={ativement.nome} onChange={e => setAtivement({...ativement, nome : e.target.value})}>Nome do ativo</Input>
      
      <Select places={places} styles="w-[20%]" id="localativo" value={ativement.local} onChange={e => setAtivement({...ativement, local : e.target.value})}>Local do ativo</Select>

      <ButtonTransparent onClick={clearInput} styles="w-[15%] text-primary-blue border-primary-blue">Limpar campos</ButtonTransparent>

      <Button styles="w-[15%]">Inserir ativo</Button>

    </form>
  )
}