import {FaEye, FaInfo, FaLink, FaStar, FaUtensils} from "react-icons/fa"
import GithubContext from "../../context/github/GithubContext"

function RepoItem({repo}) {

  const {repos} = useContext(GithubContext)

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