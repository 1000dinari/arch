
function Home() {
  console.log(typeof(process.env.REACT_APP_GITHUB_TOKEN))
  return (
    <div>
        <h1 className="text-6xl">Welcome</h1>
        {process.env.REACT_APP_GITHUB_TOKEN}
    </div>
  )
}

export default Home