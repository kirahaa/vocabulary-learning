
import FlexBox from '../../components/common/FlexBox'
import {useEffect, useState} from 'react'
import useWord, {wordListFilterState} from './store/useWord'
import styled from 'styled-components'
import Pagination from '../../components/pagination/pagination'
import Row from '../../components/common/Row'
import WordItem from './WordItem'
import {wordLevels} from '../../database/words'
import {useRecoilState} from 'recoil'
import {useParams} from 'react-router-dom'

const Select = styled.select`
  padding: 1rem;
  background-color: ${props => props.theme.gray};
  border: none;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  option {
    color: #000;
  }
`

const selectOption = [
  {value: 10},
  {value: 20},
  {value: 50},
  {value: 100}
]

const List = () => {
  // ** hoos
  const params = useParams()

  // ** recoil states
  const [words, setWords, filteredWordList] = useWord()
  const [filter, setFilter] = useRecoilState(wordListFilterState)


  // ** pagination states
  const [limit, setLimit] = useState(10) // 몇 개씩 보여줄지
  const [page, setPage] = useState(1) // 현재 페이지
  const offset = (page - 1) * limit // 몇 번째꺼 까지

  const handleCheck = (id) => {
    let newWords = words.map(word => {
      return word.id === id ? {...word, isCompleted: word.isCompleted ? false : true } : word
    })
    setWords(newWords)
  }

  useEffect(() => {
    if (params.id) {
      setFilter(params.id)
    }
  }, [])

  return (
    <>
      <Row>
        <FlexBox justify="space-between">
          <label>
            <Select
              value={filter}
              onChange={({target: {value}}) => setFilter(value)}
            >
              <option value="all">All</option>
              {Object.keys(wordLevels).map(level => (
                <option key={`select-${level}`} value={level}>{level}</option>
              ))}
            </Select>
          </label>

          <label>
            <Select
              type="number"
              value={limit}
              onChange={({target: {value}}) => setLimit(Number(value))}
            >
              {selectOption.map(option => (
                <option key={`select-${option.value}`} value={option.value}>{option.value}</option>
              ))}
            </Select>
          </label>
        </FlexBox>
      </Row>
      <FlexBox direction="column" gap="2">
        {
          filteredWordList.slice(offset, offset + limit).map(word => (
            <WordItem key={word.en} word={word} handleCheck={() => handleCheck(word.id)}/>
          ))
        }
      </FlexBox>

      <Pagination
        total={filteredWordList.length}
        limit={limit}
        page={page}
        setPage={setPage}
       />
    </>
  )
}

export default List