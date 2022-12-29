import {createContext, useReducer} from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`)


        const {items} = await response.json()
        dispatch({
            type:"GET_USERS",
            payload: items
        })
        
    }

    const getUser = async (login) => {
        setLoading()
        
        const response = await fetch(`${GITHUB_URL}/users/${login}`)


        if(response.status === 404)
        {
            window.location="/notfound"
        }
        else
        {
            const data = await response.json()
            dispatch({
                type:"GET_USER",
                payload: data,
            })
        }
        
    }

    const getUserRepos = async (login) => {
        setLoading()
        
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?sort=updated`)

        const items = await response.json()
        dispatch({
            type:"GET_USER_REPOS",
            payload: items,
        })
    }


    const setLoading = () => {
        dispatch({
            type:"SET_LOADING",
        })
    }

    const deleteUsers = () =>
    {
        setLoading()
        dispatch({
            type:"CLEAR_USERS",
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        getUserRepos,
        searchUsers,
        deleteUsers,
        getUser,
    }}>
        {children}
    </GithubContext.Provider>

}

export default GithubContext