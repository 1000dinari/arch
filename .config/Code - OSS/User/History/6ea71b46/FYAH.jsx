
function UserItem({user: {login, avatar_url}}) {
  return (
    <div className="card shadow-md compact side bg-slate-600">
        {login}
        {avatar_url}
    </div>
  )
}

export default UserItem