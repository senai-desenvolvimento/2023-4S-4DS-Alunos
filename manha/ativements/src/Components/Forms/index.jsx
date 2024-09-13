import { useContext, useEffect, useState } from "react";
import { Button, ButtonTransparent } from "../Button";
import { Input, Select } from './../Input/index';
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

export const FormAtivement = ({ list, setList, places, setPlaces, update }) => {
  const { user } = useContext(context);
  const [ativement, setAtivement] = useState({
    numero : "",
    nome : "",
    local : ""
  })

  const validateData = async (e) => {
    e.preventDefault();

    // Procurar a existencia de um ativo com a numeracao destaca
    const numeracaoEmUso = await validateNumberAtivement()

    // Quantidade de caracteres maior que 2 - nome
    if(ativement.nome.length <= 2){
      alert("Nome do ativo com poucos caracteres, obrigatório ser mais do que 2")

    }else if(ativement.numero.length <= 5){
      // Quantidade de caracteres maior que 5 - numeracao
      alert("Número do ativo com poucos caracteres, obrigatório ser mais do que 5")

    }else if(ativement.nome.trim() == "" || ativement.local.trim() == ""){
      // verificar se no campo de nome e local, não contem somente espaços vazios
      alert("Campos não preenchidos corretamente")

    }else if(numeracaoEmUso){
      // A numeracao do ativo, não pode ser repetida
      alert("Número do ativo já utilizado, informe outra numeração")

    }else{
      // Caso tudo certo, cadastrar/editar ativo
      createAtivement();
    }
  } 

  const validateNumberAtivement = () => {
    return fetch("http://localhost:3000/ativos?numero=" + ativement.numero)
          .then(response => response.json())
          .then(response => {
            if(response[0]){ // Se retornar um ativo com o numero informado, não pode cadastra-lo
              return true
            }
            return false
          }).catch(() => {
            return true
          })
  }

  const createAtivement = async (e) => {
    try{
      // Procurar o local especificado para ver se ele existe
      const localId = await findPlace(ativement.local)

      const data = {
        ...ativement,
        local : localId,
        id : uuid(),
        usuario_id : user.id,
        dataRegistro : new Date().toLocaleString(),
        status : true
      }

      fetch("http://localhost:3000/ativos", {
        method : "POST",
        body : JSON.stringify(data)
      })

      // Alimentando o novo ativo na lista de ativos
      setList([...list, data])
    }catch{
    }
  }

  const findPlace = (local) => {
    return fetch("http://localhost:3000/locais?nome=" + local)
            .then(response => response.json())
            .then(async response => {
              // Se o local, não for encontrado, registrar ele no banco de dados
              if( !response[0] ){
                return await createPlace(local);

              }else{ // Caso ele exista, retornar o id do local informado
                return response[0].id;
              }
            })
            .catch(() => {
              alert("Não foi encontrado nenhum local com essa informação")
            })
  }

  const createPlace = (local) => {
    try{
      const data = {
        id : uuid(),
        nome : local
      }

      fetch("http://localhost:3000/locais", {
        method : "POST",
        body : JSON.stringify(data)
      })

      // Inserir o novo local na lista de locais
      setPlaces([...places, data])

      return data.id;

    }catch{
      alert("Não foi possível registrar o novo local")
    }
  }

  useEffect(() => {
    setAtivement(update)
  }, [update])

  return (
    <form onSubmit={validateData} className="bg-[#D9D3F6] w-full py-5 px-10 mt-6 rounded flex justify-between items-end shadow-md">
      
      <Input disabled={!!ativement.id} type="number" styles="w-[20%]" id="numeroativo" value={ativement.numero} onChange={e => setAtivement({...ativement, numero : e.target.value})}>Número do ativo</Input>

      <Input type="text" styles="w-[20%]" id="nomeativo" value={ativement.nome} onChange={e => setAtivement({ ...ativement, nome : e.target.value})}>Nome do ativo</Input>

      <Select places={places} styles="w-[20%]" id="localativo" value={ativement.local} onChange={e => setAtivement({...ativement, local : e.target.value})}>Local do ativo</Select>

      <ButtonTransparent styles="w-[15%] border-primary-blue text-primary-blue">Limpar campos</ButtonTransparent>

      <Button styles="w-[15%]">Inserir ativo</Button>
    </form>
  )
}