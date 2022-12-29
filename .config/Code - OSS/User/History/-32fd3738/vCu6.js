import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import {useState} from 'react'
import FeedbackStats from './components/FeedbackStats'
import FeedbackData from './data/FeedbackData'
import FeedbackForm from './components/FeedbackForm'
import { v4 as uuidv4 } from "uuid"
import AboutPage from './components/pages/AboutPage'
import { FeedbackProvider } from './context/FeedbackContext'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AboutIconLink from './components/AboutIconLink'

function App() {
    const [feedback, setFeedback] = useState(FeedbackData) 
    
    
    return (
        <FeedbackProvider>
            <Router>
            <Header />
            <div className="container">
                <Routes>

                    <Route exact path="/" element={
                        <>
                        <FeedbackForm />
                        <FeedbackStats />
                        <FeedbackList />
                        {/* <AboutIconLink /> */}
                        </>
                    }>
                    </Route>
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
                    <AboutIconLink />
            </div>
            </Router>
        </FeedbackProvider>
    ) 
}

export default App