import Title from '../../components/common/Title'
import Row from '../../components/common/Row'
import Input from '../../components/common/Input'
import styled from 'styled-components'
import StyledButton from '../../components/button/Button'
import {wordLevels} from '../../database/words'
import StyledSelect from '../../components/common/Select'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import ErrorMsg from '../../components/common/ErrorMsg'
import useUser from '../auth/store/useUser'
import {useEffect, useState} from 'react'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
`

const Select = styled(StyledSelect)`
  padding: 1.3rem 2rem;
  border-radius: 3rem;
  font-size: 1.8rem;
`

const Button = styled(StyledButton)`
  border-radius: 3rem;
  font-size: 1.8rem;
`

const Form = () => {
  // ** hooks
  const navigate = useNavigate()
  const {currentUser, setCurrentUser} = useUser()
  const {register, handleSubmit, reset, setFocus, formState: {errors}} = useForm()

  // states
  const [enFocus, setEnFocus] = useState(false)

  const AddWord = (data) => {
    setCurrentUser(() => {
      return {...currentUser,
        words: [...currentUser.words, {
          ...data,
          id: Number(currentUser.words.length) + 1
        }]
      }
    })
    alert('단어가 추가되었습니다.')
    navigate('/')
  }

  const onSubmit = data => {
    let existedEnWord = currentUser.words.find(word => word.en === data.en)

    if (existedEnWord) {
      if (window.confirm('이미 리스트에 존재하는 단어입니다. 그래도 단어를 추가하시겠습니까?')) {
        AddWord(data)
      }
      reset()
      setEnFocus(true)
    } else {
      AddWord(data)
    }
  }

  useEffect(() => {
    if (enFocus) {
      setFocus('en')
    }
  }, [setFocus, enFocus])

  return (
    <>
      <Title>Add New Word</Title>
      <Row>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Select {...register('level', {
              required: "Select level category"
            })}>
              <option value="">Select level</option>
              {Object.keys(wordLevels).map(level => (
                <option key={`form-select-${level}`} value={level}>{level}</option>
              ))}
            </Select>
            {errors.level && <ErrorMsg>{errors.level.message}</ErrorMsg>}
          </div>

          <div>
            <Input
              type="text"
              placeholder="English"
              {...register('en', {
                required: "English is Required",
                pattern: {
                  value:  /^[a-zA-Z0-9 ]*$/,
                  message: 'Please write in english only'
                }
              })}
            />
            {errors.en && <ErrorMsg>{errors.en.message}</ErrorMsg>}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Korean"
              {...register('ko', {
                required: "Korean is Required",
                pattern: {
                  value: /^[ㄱ-ㅎ|가-힣|0-9| ]+$/,
                  message: 'Please write in korean only'
                }
              })}
            />
            {errors.ko && <ErrorMsg>{errors.ko.message}</ErrorMsg>}
          </div>

          <Button type="submit" bgColor="primary">Add New Word</Button>
        </StyledForm>
      </Row>
    </>
  )
}

export default Form