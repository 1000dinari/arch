import { useState } from "react"
import Card from "./shared/Card"

function FeedbackForm() {
    const [text,setText] = useState('')

    const handleTextChange = (e) => {
        console.log(e.target.value)
    }

  return (
    <Card>
        <form>
            <h2>How would your rate our service?</h2>
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder="Write a review" />
                <button type="submit">Send</button>
            </div>
        </form>
    </Card>
  )
}

export default FeedbackForm