import React from 'react'
import "./style.css"

const Button = (props) => {
  return (
    <button type={props.type} className={`botao ${props.elevation && "botao-elevacao"}`} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
