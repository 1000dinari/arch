function Card({children, reverse}) {
    return (
        <div className={`card   ${reverse===true?reverse:}`}>
            {children}
        </div>
      )

}

export default Card