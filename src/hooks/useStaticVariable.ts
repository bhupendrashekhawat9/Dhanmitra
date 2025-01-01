import { useRef } from "react"

export const useStaticVariable = <t>(val:t):t=>{
    let staticRef = useRef(val);
return staticRef.current
}