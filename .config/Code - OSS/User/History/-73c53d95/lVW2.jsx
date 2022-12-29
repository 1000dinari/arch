// import React from 'react'

function FeedbackList({feedback}) {
  if(!feedback || feedback.length === 0)
    return <p>No feedback yet.</p>
  return (
    <div>FeedbackList</div>
  )
}

export default FeedbackList