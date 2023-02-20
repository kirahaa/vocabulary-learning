import styled, {css} from "styled-components"
import StyledImage, {Image} from "../../components/common/Image"
import StyledInput from "../../components/common/Input"
import StyledButton from "../../components/common/Button"
import FlexBox from "../../components/common/FlexBox"
import useAuth from "../../hooks/useAuth"

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
  const {
    newAccount,
    register,
    errors,
    file,
    fileInputRef,
    handleSubmit,
    onSubmit,
    handleFileChange,
    handleAccountBtn
  } = useAuth()

  return (
    <Wrap>
      <Image src={require('../../assets/images/title.png')}/>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* 회원가입 하는 경우, 프로필 사진, 이름 영역 추가 */}
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
                placeholder="Name"
                {...register("name", {required: newAccount ? true : false })}/>
              {errors.name?.type === 'required' && <AlertMsg role="alert">Name is required</AlertMsg>}
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