import { useState } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"

function FeedbackForm() {
    const [text,setText] = useState('')
    const [btnDisabled,setBtnDisabled] = useState(true)
    const [message,setMessage] = useState('')
    const [rating,setRating] = useState(10)

    const handleTextChange = (e) => {
        if( text=== '' )
        {
            setBtnDisabled(true)
            setMessage(null)
        }
        else if( text!== '' && text.trim().length <= 10)
        {
            setBtnDisabled(true)
            setMessage('Enter atleast 10 characters')
        }
        else
        {
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(e.target.value)
    }

  return (
    <Card>
        <form>
            <h2>How would your rate our service?</h2>
            <RatingSelect />
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text} />
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className="message">{message}</div> }
        </form>
    </Card>
  )
}

export default FeedbackForm