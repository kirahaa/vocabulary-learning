import {atom, selector, useRecoilState, useRecoilValue} from 'recoil'
import {wordLevels, words} from '../../../database/words'
import {currentUserState} from "../../auth/store/useUser"
import {todayDate} from '../../../utility'

const wordListState = atom({
  key: 'wordListState',
  default: words
})

export const wordListFilterState = atom({
  key: 'wordListFilterState',
  default: 'all',
})

// ** 오늘의 단어 리스트 (10개)
const todayWordListState = atom({
  key: 'todayWordListState',
  default: []
})

// ** 현재 퀴즈 단어 index
export const currentQuizWordState = atom({
  key: 'currentQuizWordState',
  default: 0
})

// ** 유저 별 오늘의 단어 숫자 데이터
export const todayWordListNumStates = selector({
  key: 'todayWordListNumStates',
  get: ({get}) => {
    const user = get(currentUserState)
    const todayList = user.history ? user.history[todayDate] ? user.history[todayDate] : get(todayWordListState) : get(todayWordListState)
    const todayTotalNum = todayList.length
    const todayCompletedNum = todayList.filter(item => item.isCompleted).length
    const todayPercentage = todayTotalNum !== 0 && (todayCompletedNum / todayTotalNum) * 100

    return {
      todayTotalNum,
      todayCompletedNum,
      todayPercentage
    }
  }
})

// ** 단어 리스트 숫자 데이터들
export const wordListNumStates = selector({
  key: 'wordListNumStates',
  get: ({get}) => {
    const user = get(currentUserState)
    const list = user.words
    const totalNum = list.length
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

// ** 퀴즈에서 쓸 랜덤 선택지
export const randomNotTodayListState = selector({
  key: 'randomNotTodayListState',
  get: ({get}) => {
    const currentIndex = get(currentQuizWordState)
    const words = get(wordListState)
    const todayList = get(todayWordListState)
    const notTodayList = [...words].sort(() => Math.random() - 0.5).filter(word => !todayList.includes(word)).slice(0, 2)
    const currentWord = todayList[currentIndex]
    const randomOptions = notTodayList.concat(currentWord).sort(() => Math.random() - 0.5)

    if (currentIndex > 9) { // 10개까지
      return null
    } else {
      return randomOptions
    }
  }
})

// ** level별로 필터링 된 단어 리스트
const filteredWordListState = selector({
  key: 'filteredWordListState',
  get: ({get}) => {
    const filter = get(wordListFilterState)
    const user = get(currentUserState)
    const list = user.words

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
  const [todayList, setTodayList] = useRecoilState(todayWordListState)
  const filteredWordList = useRecoilValue(filteredWordListState)

  return {
    words,
    setWords,
    todayList,
    setTodayList,
    filteredWordList
  }
}

export default useWord