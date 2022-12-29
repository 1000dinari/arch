function Card({children, reverse}) {
    if(reverse===true) {
        return (
            <div className="card reverse">
                {children}
            </div>
          )
    }
    else
    {
        return (
            <div className="card">
                {children}
            </div>
            )
    }

}

export default Card