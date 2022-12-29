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
    <div className="mb-2 rounded-medium card bg-rose-900 bg-opacity-20 hover:bg-red-900">
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <a href={html_url}>
            <FaLink className="inline r-1" /> {name}
          </a>
        </h3>
        <p className="mb-3">
          {description}
        </p>
        <div>
          <div className="mr-2 badge badge-info badge-lg">
            <FaEye className="mr-2" /> {watchers_count}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepoItem