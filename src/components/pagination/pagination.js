import Button from '../button/Button'
import styled from 'styled-components'
import {ChevronLeft, ChevronRight} from 'react-feather'
import {useState} from 'react'

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .4rem;
  margin: 2.6rem;
`

const StyledButton = styled(Button)`
  width: fit-content;
`

const Pagination = ({total, limit, page, setPage}) => {
  const numPages = Math.ceil(total / limit) // 총 몇개의 페이지가 나오는지
  const [currPage, setCurrPage] = useState(page)
  let firstNum = currPage - (currPage % 5) + 1
  let lastNum = currPage - (currPage % 5) + 5
  const btnLength = numPages < 5 ? numPages - 1 : 4

  return (
    <Nav>
      <Button
        icon
        bgColor="gray"
        onClick={() => {setPage(page - 1); setCurrPage(page - 2)}}
        disabled={page === 1}
      >
        <ChevronLeft/>
      </Button>
      <StyledButton
        onClick={() => setPage(firstNum)}
        bgColor={page === firstNum ? "primary" : null}
        aria-current={page === firstNum ? "page" : null}>
        {firstNum}
      </StyledButton>
      {Array(btnLength)
        .fill()
        .map((_, i) => {
          if (i <= 2) {
            return (
              <StyledButton
                key={`pagination-btn-${i + 1}`}
                onClick={() => setPage(firstNum + i + 1)}
                bgColor={page === firstNum + i + 1 ? "primary" : null}
                aria-current={page === firstNum + i + 1 ? "page" : null}
              >
                {firstNum + i + 1}
              </StyledButton>
            )}
          else if (i >= 3) {
            return (
              <StyledButton
                key={`pagination-btn-${i + 1}`}
                onClick={() => setPage(lastNum)}
                bgColor={page === lastNum ? "primary" : null}
                aria-current={page === lastNum ? "page" : null}
              >
                {lastNum}
              </StyledButton>
            )
          }
        })
      }
      <Button
        icon
        bgColor="gray"
        onClick={() => {setPage(page + 1); setCurrPage(page)}}
        disabled={page === numPages}
      >
        <ChevronRight/>
      </Button>
    </Nav>
  )
}

export default Pagination