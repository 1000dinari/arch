// import React from 'react'

function Header(props) {
  return (
        <header style={{backgroundColor:'green', color:'blue'}}>
        <div className='container'>
        <h2>
            {props.text}
        </h2>
    </div>
    </header>
    
  )
}

export default Header