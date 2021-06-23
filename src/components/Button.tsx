import { ButtonHTMLAttributes } from "react"
import "../styles/button.scss";
//rafc
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: IButtonProps) => {
  return (
    <button {...props} className="button" />
  )
}
