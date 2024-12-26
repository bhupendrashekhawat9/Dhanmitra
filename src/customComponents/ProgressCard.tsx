import { ReactNode, useState } from 'react'
import "./customComponents.css"
export interface ProgressCardProps{
    children?: ReactNode;
    progress: CSSStyleDeclaration['width'];
    sx?: CSSStyleDeclaration
    progressColor: CSSStyleDeclaration["color"]
    handleOnClick?:()=>void;
    detailComponent?:ReactNode|null;

}


const ProgressCard = (props:ProgressCardProps) => {

  const [toggleDetails, setToggleDetails] = useState(false)
  let handleOnClick = (e)=>{
    if(props.detailComponent){
      setToggleDetails(prev=> !prev);
    }
  }
  return (
    <>
    <div id={"progress"} onClick={handleOnClick} >
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
        <>
        {
          props.detailComponent && toggleDetails ? <div style={{
            padding:'1rem .5rem'
          }} 
          onClick={e=> e.stopPropagation()}
          >{props.detailComponent}</div> : <></>
        }
        </>
    </div>
        </>
  )
}

export default ProgressCard