import {atom, selector, useRecoilState, useRecoilValue} from 'recoil'
import {wordLevels, words} from '../../../database/words'

const wordListState = atom({
  key: 'wordListState',
  default: words
})

export const wordListFilterState = atom({
  key: 'wordListFilterState',
  default: 'all',
})

const filteredWordListState = selector({
  key: 'filteredWordListState',
  get: ({get}) => {
    const filter = get(wordListFilterState)
    const list = get(wordListState)

    switch (filter) {
      case wordLevels.basic:
        return list.filter((item) => item.level === wordLevels.basic)
      case wordLevels.intermediate:
        return list.filter((item) => item.level === wordLevels.intermediate)
      case wordLevels.advanced:
        return list.filter((item) => item.level === wordLevels.advanced)
      default:
        return list
    }
  }
})

const useWord = () => {
  const [words, setWords] = useRecoilState(wordListState)
  const filteredWordList = useRecoilValue(filteredWordListState)

  return [
    words,
    setWords,
    filteredWordList
  ]
}

export default useWord