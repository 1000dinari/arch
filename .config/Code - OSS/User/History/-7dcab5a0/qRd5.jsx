import { FaTimes } from "react-icons/fa"
import PropTypes from "prop-types"
import Card from "./shared/Card"

function FeedbackItem({item}) {
    
    const handleClick=() => {
        console.log(123)
    }

    return (
    <Card>
        <div className="num-display">{item.rating}</div>
        <button onClick={handleClick} className="close">
            <FaTimes color="purple" />
        </button>
        <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
    item : PropTypes.object.isRequired,
}

export default FeedbackItem