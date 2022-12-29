
function UserItem({user: {login, avatar_url}}) {
  return (
    <div className="card shadow-md compact side bg-green-400">
        {login}
        {avatar_url}
    </div>
  )
}

export default UserItem