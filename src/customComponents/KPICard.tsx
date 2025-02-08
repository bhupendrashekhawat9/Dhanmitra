import { ReactNode } from 'react'



interface KPICardProps{
    children: ReactNode,
    style?:CSSStyleDeclaration
}
const KPICard = (props:KPICardProps) => {
  return (
    <div  style={{ height:'max-content',minHeight:"100%", borderRadius:'.5rem', padding:'.5rem'
    }}>
        {
            props.children
        }

    </div>
  )
}

export default KPICard