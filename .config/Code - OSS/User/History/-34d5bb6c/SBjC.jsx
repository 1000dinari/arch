// import React from 'react'

function FeedbackStats({feedback}) {
    let average = feedback.reduce((acc, cur) => {
        return acc+cur.rating
    }, 0)
    
  return (
    <div className="feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating : {average/feedback.length}</h4>
    </div>
  )
}

export default FeedbackStats