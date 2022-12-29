import { useState } from "react"
import Card from "./shared/Card"

function FeedbackForm() {
  return (
    <Card>
        <form>
            <h2>How would your rate our service?</h2>
            <div className="input-group">
                <input type="text" placeholder="Write a review" />
                <button type="submit">Send</button>
            </div>
        </form>
    </Card>
  )
}

export default FeedbackForm