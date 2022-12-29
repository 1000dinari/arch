// import React from 'react'

function Header(props) {
  return (
        const headerStyle = {
            backgroundColor:'green',
            color:'green'
        }
        <header style={headerStyle}>
        <div className='container'>
        <h2>
            {props.text}
        </h2>
    </div>
    </header>
    
  )
}

export default Header