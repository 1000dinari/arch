import {useState} from 'react'

function FeedbackItem() {
    const [rating, setRating] = useState(7)
    const [text, setText] = useState('')
    return (
    <div className="card">
        <div className="num-display">
            {rating}
        </div>
        <div className="text-display">
            Lorem ipsum dolor sit amet.
        </div>
        </div>
  )
}

export default FeedbackItem