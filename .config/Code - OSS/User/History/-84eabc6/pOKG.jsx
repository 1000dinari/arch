import {FaQuestion} from "react-icons/fa"
import {Link} from "react-router-dom"

function AboutIconLink() {
  return (
    <div className="about-link">
        <Link to="/">
            <FaQuestion size={30} />
        </Link>
    </div>
  )
}

export default AboutIconLink