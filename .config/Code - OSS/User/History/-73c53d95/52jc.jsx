import PropTypes from "prop-types"
import FeedbackItem from "./FeedbackItem"

function FeedbackList(props) {
  const {feedback, handleDelete} = props
  if(!feedback || feedback.length === 0)
    return <p>No feedback yet.</p>
  return (
    <div className="feedback-list">
        {feedback.map((item) => (
            <FeedbackItem 
            key={item.id} 
            item={item} 
            handleDelete={handleDelete} />
        ))}
    </div>
  )
}

FeedbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape( {
            id: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        }
        )
    )
}

export default FeedbackList