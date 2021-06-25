import { ButtonHTMLAttributes } from "react"
import "../styles/button.scss";
//rafc
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOutlined?: boolean;
}

export const Button = ({isOutlined = false, ...props}: IButtonProps) => {
  return (
    <button 
      {...props}
      className={`button ${isOutlined && 'outlined'}`}
    />
  )
}
