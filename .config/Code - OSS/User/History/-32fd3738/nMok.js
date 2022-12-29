import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import {useState} from 'react'
import FeedbackData from './data/FeedbackData'

function App() {
    const [feedback, setFeedback] = useState(FeedbackData) 
    const deleteFeedback = (id) => {
        console.log(id)
    }
    return (
        <>
        <Header />
        <div className="container">
            <FeedbackList feedback={feedback} handleDelete={(id) => deleteFeedback(id)} />
        </div>
        </>
    ) 
}

export default App