import {atom, useRecoilState, useRecoilValue} from "recoil"
import {users} from "../../../database/users"

const usersState = atom({
  key: 'usersState',
  default: users
})

const localStorageEffect = (key) => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue !== null) {
    setSelf(JSON.parse(savedValue))
  }
  onSet((newValue, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue))
  })
}

export const currentUserState = atom({
  key: 'currentUserState',
  default: null,
  effects: [localStorageEffect('user')]
})

const useAuth = () => {
  const [users, setUsers] = useRecoilState(usersState)

  return [
    users,
    setUsers
  ]
}

export default useAuth