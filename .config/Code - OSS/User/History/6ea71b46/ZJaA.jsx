
function UserItem({user: {login, avatar_url}}) {
  return (
    <div className="card shadow-md compact side bg-slate-900">
        <div className="flex-row items-enter space-x-4 card-body">
            <div>
                <div className="avatar">
                    <div className="rounded-full shadow w-14 h-14">
                        <img src={avatar_url} alt="Profile" />
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default UserItem