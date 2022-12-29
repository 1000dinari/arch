import {createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [feedbackEdit, setFeedbackEdit] = useState(
        {
            item: {},
            edit: false,

        }
    )

    useEffect(() => {
        fetchFeedback()
    }, [])

    //fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
    }

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?'))
        {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: "POST",
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json()
        
        setFeedback([data, ...feedback])
    }

    return (
        <FeedbackContext.Provider
        value={{
            feedback,
            isLoading,
            feedbackEdit,
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
        ) 
}

export default FeedbackContext