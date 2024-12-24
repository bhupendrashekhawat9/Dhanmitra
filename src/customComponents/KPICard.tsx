import React, { ReactNode } from 'react'
import styled from 'styled-components'



let StyledKPICard = styled.div`
    width: 100%;
    height: 100%;
    border-radius: .5rem;
    background-color: white;
    color:black;

`
interface KPICardProps{
    children: ReactNode,
    style?:CSSStyleDeclaration
}
const KPICard = (props:KPICardProps) => {
  return (
    <div  style={{ ...(props.style??{}),
        height:'100%', backgroundColor:'white', borderRadius:'.5rem',boxShadow:"5px 0px 20px grey", padding:'.5rem'
    }}>
        {
            props.children
        }

    </div>
  )
}

export default KPICard