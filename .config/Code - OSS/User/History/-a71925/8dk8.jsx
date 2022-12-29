import {useState, useContext} from "react"
import GithubContext from "../../context/github/GithubContext"
import AlertContext from "../../context/alert/AlertContext"

function UserSearch() {
    const {users, searchUsers, deleteUsers} = useContext(GithubContext)
    const [text, setText] = useState('')

    const {setAlert} = useContext(AlertContext)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text==='')
            setAlert("Arre kehna kya chahte ho?", "error")
        else
        {
            searchUsers(text)
            setText('')
        }
    }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input type="text" className="w-full pr-40 bg-amber-900 input input-lg text-white" placeholder="Search" 
                            value={text}
                            onChange={handleChange}
                        />
                        <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">GO</button>
                    </div>
                </div>
            </form>
        </div>
        {users.length > 0 && (<div> 
            <button onClick={deleteUsers} className="btn btn-ghost btn-lg">
                Clear
            </button>
        </div> )}
    </div>
  )
}

export default UserSearch