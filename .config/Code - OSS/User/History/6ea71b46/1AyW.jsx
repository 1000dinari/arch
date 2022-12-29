
function UserItem({user: {login, avatar_url}}) {
  return (
    <div className="card shadow-md compact side bg-slate-900">
        <div className="flex-row items-enter space-x-4 card-body">
        {login}

        </div>
        
    </div>
  )
}

export default UserItem