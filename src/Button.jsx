function Button(props) {
  return (
    <button className="border p-2 bg-green-400" onClick={props.function}>{props.label}</button>
  )
}

export default Button