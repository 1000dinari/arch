
function Home() {
  console.log(process.env.REACT_APP_GITHUB_TOKEN)
  return (
    <div>
        <h1 className="text-6xl">Welcome</h1>
        <p>
          {process.env.REACT_APP_GITHUB_TOKEN}
        </p>
    </div>
  )
}

export default Home