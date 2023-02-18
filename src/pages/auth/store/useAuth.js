import {atom, useRecoilState} from "recoil"
import {users} from "../../../database/users"

const usersState = atom({
  key: 'usersState',
  default: users
})

const useAuth = () => {
  const [users, setUsers] = useRecoilState(usersState)

  return [
    users,
    setUsers
  ]
}

export default useAuth