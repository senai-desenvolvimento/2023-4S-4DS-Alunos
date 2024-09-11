import { Button, ButtonTransparent } from "../Button";
import { Input } from './../Input/index';

export const FormAccess = ({ textButton, onSubmit, value, onChange, load }) => {
  return (
    <form onSubmit={onSubmit} className="w-[40%]">
      <Input styles="w-full" id="campoFormulario" value={value} onChange={onChange}>Usuário de acesso</Input>

      <Button load={load} styles="w-full mt-4">{textButton}</Button>
    </form>
  )
}

export const FormAtivement = () => {
  return (
    <form className="bg-[#D9D3F6] w-full py-5 px-10 mt-6 rounded flex justify-between items-end shadow-md">
      <Input styles="w-[20%]" id="numeroativo">Número do ativo</Input>

      <Input styles="w-[20%]" id="nomeativo">Nome do ativo</Input>

      <Input styles="w-[20%]" id="localativo">Local do ativo</Input>

      <ButtonTransparent styles="w-[15%] border-primary-blue text-primary-blue">Limpar campos</ButtonTransparent>

      <Button styles="w-[15%]">Inserir ativo</Button>
    </form>
  )
}