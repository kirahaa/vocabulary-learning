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

const useUser = () => {
  const [users, setUsers] = useRecoilState(usersState)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)

  return {
    users,
    setUsers,
    currentUser,
    setCurrentUser
  }
}

export default useUser