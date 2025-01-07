import styled from 'styled-components'



let StyledDivider = styled.div`
border:1px solid black;
height:2px;
width:100%;
border-radius: 1rem
`



export const Divider = (props) => {
  return <>
  <StyledDivider {...props}/>
  </>
}

export default Divider