import {useState} from 'react'

function FeedbackItem({item}) {
    const [rating, setRating] = useState({item.rating})
    const [text, setText] = useState({item.text})

    return (
    <div className="card">
        <div className="num-display">{rating}</div>
        <div className="text-display">{text}</div>
        
        </div>
  )
}

export default FeedbackItem