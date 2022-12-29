import PropTypes from 'prop-types'

function Card({children, reverse}) {
    return (
        <div className={`card ${reverse && 'reverse'}`}>
            {children}
        </div>
      )

}

Card.defaultProps = {
    reverse:false
}

Card.PropTypes = {
    children:div,
    reverse:bool
}

export default Card