
function UserItem({user: {login, avatar_url}}) {
  return (
    <div className="card shadow-md compact side bg-slate-900">
        {login}
        
    </div>
  )
}

export default UserItem