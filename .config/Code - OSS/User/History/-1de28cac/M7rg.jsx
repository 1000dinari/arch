import {FaEye, FaInfo, FaLink, FaStar, FaUtensils} from "react-icons/fa"
import GithubContext from "../../context/github/GithubContext"
import {useContext} from "react"

function RepoItem({repo}) {

    const {
        name,
        description,
        html_url,
        forks,
        open_issues,
        watchers_count,
        stargazers_count,
    } = repo

  return (
    <div>{name}</div>
  )
}

export default RepoItem