import { Puff } from "react-loader-spinner"

export const LoadingSpinner = () => {
  return (
    <Puff
      visible={true}
      height={20}
      width={20}
      color="#fafafafa"
    />
  )
}