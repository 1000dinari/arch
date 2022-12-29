// import React from 'react'

function Header({text, bgColor, textColor}) {
    const headerStyle = {
        backgroundColor:bgColor,
        color:textColor
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

Header.defaultProps = {
    text: 'Feedback App',
    bgColor: 'rgb(255,255,255)',
    textColor: 'navy blue'
}

export default Header