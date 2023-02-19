import {useForm} from "react-hook-form"
import useUser from "../pages/auth/store/useUser"
import {useNavigate} from "react-router-dom"
import {useRef, useState} from "react"
import {words} from "../database/words"

const useAuth = () => {
  const {register, handleSubmit, reset, formState: {errors}, clearErrors} = useForm()

  const {users, setUsers, setCurrentUser} = useUser()

  const navigate = useNavigate()
  const fileInputRef = useRef()
  const [newAccount, setNewAccount] = useState(false)
  const [file, setFile] = useState(require('../assets/images/defaultProfile.png'))

  const handleAccountBtn = () => {
    setNewAccount(!newAccount)
    clearErrors()
    reset()
  }

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const onSubmit = data => {
    if (newAccount) {
      // create Account
      let existedUser = users.find(user => user.loginId === data.loginId)

      if (existedUser) {
        alert('이미 존재하는 아이디입니다.')
        reset()
      } else {
        if (!file.includes('blob')) {
          alert('파일을 등록해주세요.')
        } else {
          setUsers(() => {
            return [...users, {
              ...data,
              profileImg: file,
              words: words
            }]
          })
          setNewAccount(false)
          reset()
          alert('회원가입 되었습니다. 이제 로그인 해주세요 :)')
        }
      }
    } else {
      // sign in
      let presentUser = users.find(user => user.loginId === data.loginId && user.password === data.password)

      if (presentUser) {
        setCurrentUser(presentUser)
        navigate('/')
      } else {
        alert('입력하신 정보와 회원정보가 일치하지 않습니다.')
      }
    }
  }

  return {
    handleSubmit,
    onSubmit,
    newAccount,
    fileInputRef,
    handleFileChange,
    file,
    register,
    errors,
    handleAccountBtn
  }
}

export default useAuth