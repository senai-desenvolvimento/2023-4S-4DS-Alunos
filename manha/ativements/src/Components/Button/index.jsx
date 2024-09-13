import { LoadingSpinner } from "../LoadSpinner"

export const Button = (props) => {
  return (
    <button disabled={props.load} type="submit" className={`flex justify-center py-2 px-4 rounded bg-[#004582] text-complementary-white ${props.styles}`}>
      {props.load ? <LoadingSpinner /> : props.children}
    </button>
  )
}

export const ButtonTransparent = (props) => {
  return <button onClick={props.onClick} type="button" className={`flex justify-center items-center border rounded py-2 px-4 ${props.styles}`}>{props.children}</button>
}

export const ButtonLink = (props) => {
  return <button type="button" onClick={props.onClick} className="p-1 underline text-[#372097] font-medium">{props.children}</button>
}