import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './components/pages/AboutPage'
import { FeedbackProvider } from './context/FeedbackContext'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AboutIconLink from './components/AboutIconLink'

function App() {
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