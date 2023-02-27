import {useEffect, useRef} from 'react'

const useInterval = (callback, delay) => {
  const savedCallback = useRef(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current()
    }

    if (delay !== null) {
      const timerId = setInterval(executeCallback, delay)
      return () => clearInterval(timerId)
    }
  }, [delay])
}

export default useInterval