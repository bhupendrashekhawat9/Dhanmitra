import { ReactNode } from 'react'



interface KPICardProps{
    children: ReactNode,
    style?:CSSStyleDeclaration
}
const KPICard = (props:KPICardProps) => {
  return (
    <div  style={{ height:'100%', backgroundColor:'white', borderRadius:'.5rem',boxShadow:"5px 0px 20px grey", padding:'.5rem'
    }}>
        {
            props.children
        }

    </div>
  )
}

export default KPICard