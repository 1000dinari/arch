import {FaEye, FaInfo, FaLink, FaStar, FaUtensils} from "react-icons/fa"

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
    <div>RepoItem</div>
  )
}

export default RepoItem