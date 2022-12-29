function Card({children, reverse}) {
    const cName = reverse===true ? 'card reverse' : 'card' 
    return (
        <div className={cName}>
            {children}
        </div>
      )

}

export default Card