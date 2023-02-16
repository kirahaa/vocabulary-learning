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

export const wordListNumStates = selector({
  key: 'wordListNumStates',
  get: ({get}) => {
    const list = get(wordListState)
    const totalNum = list.length;
    const totalCompletedNum = list.filter((item) => item.isCompleted).length
    const totalUnCompletedNum = totalNum - totalCompletedNum
    const percentCompleted = totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100

    const basicNum = list.filter((item) => item.level === wordLevels.basic).length
    const interNum = list.filter((item) => item.level === wordLevels.intermediate).length
    const advanNum = list.filter((item) => item.level === wordLevels.advanced).length

    return {
      totalNum,
      totalCompletedNum,
      totalUnCompletedNum,
      percentCompleted,
      basicNum,
      interNum,
      advanNum
    }
  }
})

export const randomWordListState = selector({
  key: 'randomWordListState',
  get: ({get}) => {
    const list = get(wordListState)
    const unCompletedList = list.filter((item) => !item.isCompleted)
    const randomTodayList = unCompletedList.sort(() => Math.random() - 0.5).slice(0, 10)
    const notTodayList = unCompletedList.filter(item => !randomTodayList.includes(item))

    return {
      unCompletedList,
      randomTodayList,
      notTodayList
    }
  }
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