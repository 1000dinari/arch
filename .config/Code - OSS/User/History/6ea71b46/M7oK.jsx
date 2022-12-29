
function UserItem({user: {login, avatar_url}}) {
  return (
    <div>
        {login}
        {avatar_url}
    </div>
  )
}

export default UserItem