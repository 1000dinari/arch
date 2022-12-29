import Card from "../shared/Card"
import { Link } from "react-router-dom"
function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this project</h1>
            <p>This is a feedback app which lets users add and remove reviews about a product.</p>
            <p>Version 1.0.0</p>

            <p>
                <Link to="/">Back to Home</Link>
            </p>
        </div>
    </Card>
  )
}

export default AboutPage