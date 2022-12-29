import RepoItem from "./RepoItem"
import GithubContext from "../../context/github/GithubContext"
import {useContext} from "react"

function RepoList() {

  const {repos} = useContext(GithubContext)
  console.log(repos.isArray)
  return (
    <div className="rounded-lg shadow-lg card bg-amber-900 bg-opacity-20">
        <div className="card-body">
            <h2 className="text-3xl my-4 font-bold card-title">
                Latest Repositories
            </h2>
            {repos.map((repo) => {
              <h3>{repo.name}</h3>
            })}
        </div>
    </div>
  )
}

export default RepoList