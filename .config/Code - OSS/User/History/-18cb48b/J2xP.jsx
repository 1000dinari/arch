// import React from 'react'

function Header(props) {
    const headerStyle = {
        backgroundColor:'{props.bgColor}',
        color:'{props.textColor}'
    }
    return (
        <header style={headerStyle}>
        <div className='container'>
        <h2>
            bhosad
        </h2>
    </div>
    </header>
    
  )
}

export default Header