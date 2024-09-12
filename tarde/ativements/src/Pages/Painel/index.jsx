import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { FormAtivement } from '../../Components/Forms'
import Tabs from '../../Components/Tabs'
import Table from '../../Components/Table'

const Painel = () => {
  const [selectedPlace, setSelectedPlace] = useState("" )

  const [places, setPlaces] = useState([])
  const [listAtivements, setListAtivements] = useState([])

  // Buscar os locais cadastrados no bando
  const getPlaces = () => {
    fetch("http://localhost:3000/locais")
    .then(response => response.json())
    .then(response => {
      setPlaces(response);

      // Pegando a primeira referencia dos locais dos ativos
      if(response[0]){
        setSelectedPlace(response[0].id)
      }
    })
    .catch( () => {
      alert("Erro inesperado, não foi possível obter os locais dos ativos")
    })
  }

  useEffect(() => {
    if(selectedPlace == ""){
      getPlaces();
    }
  }, [])

  // Funcao de listar os ativos de acordo com o local informado
  const filterAtivements = (local) => {
    fetch("http://localhost:3000/ativos?local=" + local)
    .then(response => response.json())
    .then(response => {
      setListAtivements(response)
    })
    .catch(() => {
      alert("Não foi possível obter os ativos")
    })
  }

  useEffect(() => {
    if(selectedPlace){
      filterAtivements(selectedPlace)
    }
  }, [selectedPlace])

  return (
    <div className='w-10/12 my-0 mx-auto'>
      <Header />

      {/* Formulario para criacao/edicao de ativos */}
      <FormAtivement places={places} setPlaces={setPlaces}  list={listAtivements} setList={setListAtivements} />

      {/* Tabs - listagem de locais de ativos */}
      <Tabs places={places} setSelectedPlace={setSelectedPlace} selectedPlace={selectedPlace} />

      {/* Listagens dos ativos cadastrados */}
      <Table list={listAtivements.filter(x => x.local === selectedPlace)} />
    </div>
  )
}

export default Painel
