import styled, {css} from "styled-components"
import StyledImage, {Image} from "../../components/common/Image"
import StyledInput from "../../components/common/Input"
import StyledButton from "../../components/common/Button"
import {useForm} from "react-hook-form"
import {useRef, useState} from "react"
import FlexBox from "../../components/common/FlexBox"
import useAuth from "./store/useAuth";
import {useNavigate} from "react-router-dom"

const Wrap = styled.div`
  position: relative;
  max-width: 540px;
  margin: 0 auto;
  font-size: 1.6rem;
  padding: 17rem 6rem 10rem;
  border-radius: 5rem;
  overflow: hidden;
  background: ${props => props.theme.bgColors.dark};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
`

const Button = styled(StyledButton)`
  border-radius: 3rem;
`

const AccountButton = styled.button`
  width: 100%;
  padding: 2rem 0;
  font-size: 1.8rem;
  text-align: center;
  text-decoration: underline;
  color: ${props => props.theme.text.gray};
`

const ImageWrap = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
`

const FakeFileUpload = styled(StyledImage)`
  cursor: pointer;
`

const AlertMsg = styled.p`
  padding: 1rem 2rem 0;
  color: ${props => props.theme.red};
  ${props => props.file && css`
    padding: 1rem 0;
  `}
`

const Login = () => {
  const {register, handleSubmit, reset, formState: {errors}, clearErrors} = useForm()

  const [users, setUsers] = useAuth()

  const navigate = useNavigate()
  const fileInputRef = useRef()
  const [newAccount, setNewAccount] = useState(false)
  const [file, setFile] = useState(require('../../assets/images/defaultProfile.png'))

  const handleAccountBtn = () => {
    setNewAccount(!newAccount)
    clearErrors()
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
        if (file.includes('blob')) {
          alert('파일을 등록해주세요.')
        } else {
          setUsers(() => {
            return [...users, {
              ...data,
              profileImg: file
            }]
          })
          setNewAccount(false)
          reset()
          alert('회원가입 되었습니다. 이제 로그인 해주세요 :)')
        }
      }
    } else {
      // sign in
      let currentUser = users.find(user => user.loginId === data.loginId && user.password === data.password)

      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser))
        navigate('/')
      } else {
        alert('입력하신 정보와 회원정보가 일치하지 않습니다.')
      }
    }
  }

  return (
    <Wrap>
      <Image src={require('../../assets/images/title.png')}/>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {newAccount ? (
          <FlexBox justify="space-between" align="center" gap="2">
            <StyledInput
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
            <ImageWrap>
              <FakeFileUpload
                src={file}
                radius="true"
                onClick={() => {
                  fileInputRef.current?.click()
                }}
              />
            </ImageWrap>
            <div>
              <StyledInput
                type="text"
                placeholder="Username"
                {...register("username", {required: newAccount ? true : false })}/>
              {errors.username?.type === 'required' && <AlertMsg role="alert">Username is required</AlertMsg>}
            </div>
          </FlexBox>
        ) : null}
        <div>
          <StyledInput
            type="text"
            placeholder="ID"
            maxLength="20"
            {...register("loginId", {required: true})}
          />
          {errors.loginId?.type === 'required' && <AlertMsg role="alert">ID is required</AlertMsg>}
        </div>
        <div>
          <StyledInput
            type="password"
            placeholder="Password"
            maxLength="20"
            {...register("password", {required: true})}/>
          {errors.password?.type === 'required' && <AlertMsg role="alert">Password is required</AlertMsg>}
        </div>
        <Button type="submit" bgColor="primary">{newAccount ? "Create Account" : "Sign In"}</Button>
      </Form>
      <AccountButton onClick={handleAccountBtn}>{newAccount ? "Sign In" : "Create Account"}</AccountButton>
    </Wrap>
  )
}

export default Login