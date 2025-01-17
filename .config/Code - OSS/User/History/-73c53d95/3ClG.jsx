import {useContext} from "react"
import FeedbackItem from "./FeedbackItem"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackList() {
  const {feedback, isLoading} = useContext(FeedbackContext)

  

  if(!isLoading && (!feedback || feedback.length === 0))
    return <p>No feedback yet.</p>
  
  
  return isLoading ? <h3>loading...</h3> : (
    <div className="feedback-list">
        {feedback.map((item) => (
            <FeedbackItem 
            key={item.id} 
            item={item} 
            />
        ))}
    </div>
  )
}

// FeedbackList.propTypes = {
//     feedback: PropTypes.arrayOf(
//         PropTypes.shape( {
//             id: PropTypes.number.isRequired,
//             rating: PropTypes.number.isRequired,
//             text: PropTypes.string.isRequired
//         }
//         )
//     )
// }

export default FeedbackList