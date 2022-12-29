import Card from "../shared/Card"
function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this project</h1>
            <p>This is a feedback page which lets users add and remove reviews about a product.</p>
            <p>Version 1.0.0</p>

            <p>
                <a href="/">Back to Home</a>
            </p>
        </div>
    </Card>
  )
}

export default AboutPage