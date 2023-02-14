import styled from 'styled-components'

const Progress = styled.div`
  width: 100%;
  height: 1rem;
  margin: 1rem 0;
  background-color: rgba(255,255,255,.2);
  border-radius: 1rem;
`

const Dealt = styled.div`
  width: ${(props) => '50%'};
  height: inherit;
  background-color: #fff;
  border-radius: 1rem;
`

const ProgressBar = () => {
  return (
    <Progress>
      <Dealt />
    </Progress>
  )
}

export default ProgressBar