import {useEffect} from "react"

function UserResults() {
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, headers:{
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        })

        const data = await response.json()

        console.log(data)
    }

  return (
    <div>UserResults</div>
  )
}

export default UserResults