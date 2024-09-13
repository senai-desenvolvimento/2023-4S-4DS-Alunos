import React from 'react'

export const Input = (props) => {
  return (
    <div className={props.styles}>
      <label htmlFor={props.id} className='text-lg block mb-2 font-base'>{props.children}</label>

      <input
        id={props.id} type="text"
        className="w-full p-2 px-3 border border-complementary-gray rounded bg-complementary-white disabled:bg-[#ddd] disabled:cursor-not-allowed"

        autoComplete='off'

        required
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
      />
    </div>
  )
}

export const Select = (props) => {
  return (
    <div className={props.styles}>
      <label htmlFor={props.id} className='text-lg block mb-2 font-base'>{props.children}</label>

      <input
        type="text"
        id={props.id}
        autoComplete='off'
        list="sugestion-items"
        className="w-full p-2 px-3 border border-complementary-gray rounded bg-complementary-white"
        
        required
        value={props.value}
        onChange={props.onChange}
      />

      <datalist id="sugestion-items">
        {
          props.options.map((item, index) => {
            return (
              <option key={item.id} value={item.nome}/>
            );
          })
        }
      </datalist>

      {/* <select
        required id={props.id} autoComplete='off'
        value={props.value} onChange={props.onChange}
        className="w-full p-2 px-3 border border-complementary-gray rounded bg-complementary-white"
      > 
        <option defaultChecked></option>
        {
          props.options.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.nome}
              </option>
            );
          })
        }
      </select> */}
    </div>
  )
}
