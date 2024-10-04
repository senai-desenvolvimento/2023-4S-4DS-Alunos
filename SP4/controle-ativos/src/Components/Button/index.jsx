import React from 'react'

export const Button = (props) => {
  return (
    <button type='submit' disabled={props.disabled} className={`flex justify-center py-2 px-4 bg-[#004582] rounded text-complementary-white ${props.styles}`}>{props.children}</button>
  )
}

export const ButtonTransparent = (props) => {
  return (
    <button type='button' onClick={props.onClick} className={`flex justify-center border rounded py-2 px-4 ${props.styles}`}>{props.children}</button>
  )
}

export const ButtonLink = (props) => {
  return (
    <button onClick={props.onClick} className='p-1 underline decoration-solid text-[#372097] font-medium'>{props.children}</button>
  )
}
