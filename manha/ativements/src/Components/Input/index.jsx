export const Input = (props) => {
  return (
    <div className={props.styles}>
      <label className="block text-lg font-base mb-2" htmlFor={props.id}>{props.children}</label>

      <input
        disabled={props.disabled}
        className="w-full py-2 px-3 border rounded border-complementary-gray"

        id={props.id}
        type={props.type}
        autoComplete="off"

        required
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export const Select = (props) => {
  return (
    <div className={props.styles}>
      <label className="block text-lg font-base mb-2" htmlFor={props.id}>{props.children}</label>

      <input
        list="list-places"
        className="w-full py-2 px-3 border rounded border-complementary-gray"

        id={props.id}
        type="text"
        autoComplete="off"

        required
        value={props.value}
        onChange={props.onChange}
      />

      <datalist id="list-places">
        {
          props.places.map( (item, index) => {
            return <option value={item.nome} />
          })
        }
      </datalist>
    </div>
  )
}