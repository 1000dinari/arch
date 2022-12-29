import propTypes from 'prop-types'

function Header({text, bgColor, textColor}) {
    const headerStyle = {
        backgroundColor:bgColor,
        color:textColor
    }
    return (
        <header style={headerStyle}>
        <div className='container'>
        <h2>
            {text}
        </h2>
    </div>
    </header>
    
  )
}

Header.defaultProps = {
    text: 'Feedback App',
    bgColor: 'pink',
    textColor: 'red'
}

Header.propTypes = {
    bgColor: propTypes.color,
    textColor: propTypes.color
}

export default Header