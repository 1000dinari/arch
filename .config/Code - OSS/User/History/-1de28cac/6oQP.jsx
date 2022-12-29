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
    <div className="mb-2 rounded-medium card bg-amber-900 hover-bg-amber-700">
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <a href={html_url}>
            <FaLink className="inline r-1" /> {name}
          </a>
        </h3>
      </div>
    </div>
  )
}

export default RepoItem