
function Home() {
  console.log({process.env.REACT_APP_GITHUB_TOKEN})
  return (
    <div>
        <h1 className="text-6xl">Welcome</h1>
    </div>
  )
}

export default Home