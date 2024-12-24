import React, { FC, ReactNode } from 'react'
import styled, { keyframes } from 'styled-components';
import "./customComponents.css"
export interface ProgressCardProps{
    children?: ReactNode;
    progress: CSSStyleDeclaration['width'];
    sx?: CSSStyleDeclaration
    progressColor: CSSStyleDeclaration["color"]
}


const ProgressCard = (props:ProgressCardProps) => {
  return (
    <>
    <div id={"progress"} onClick={props.handleOnClick} >
      <div id={"progress-bar"} style={{width: `${props.progress}%`,zIndex:2}}>

      </div>
      <div style={{
        position:'relative',
        zIndex:'3',
        
      }}>

        {
          props.children
        }
        </div>
    </div>
        </>
  )
}

export default ProgressCard