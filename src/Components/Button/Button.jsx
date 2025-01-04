

const Button = ({text , style , Submit}) => {
  return (
   <button onClick={Submit} className={style}>{text}</button>
  )
}

export default Button