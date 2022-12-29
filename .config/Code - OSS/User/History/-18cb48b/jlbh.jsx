import PropTypes from 'prop-types'

function Header({text, bgColor, textColor}) {
    const headerStyle = {
        backgroundColor:bgColor,
        color:textColor
    }
    return (
        <header style={headerStyle}>
        <div className='container'>
        <h1>
            {text}
        </h1>
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
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string
}

export default Header