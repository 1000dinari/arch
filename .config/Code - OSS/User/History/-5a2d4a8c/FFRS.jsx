function Card({children, reverse}) {
    const cName = reverse===true ? 'card' : 'card reverse' 
    return (
        <div className={cName}>
            {children}
        </div>
      )

}

export default Card