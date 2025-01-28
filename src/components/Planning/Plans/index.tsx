
export interface PlansType{
    type:"PLAN"|"GOAL",
    name:string;
    description:string,
    budgetAmount:number;
    budgetAmountIncludes : Array<{category:"SAVINGS"|"INCOME",amount:number;}>,
    themeImage?:string;
}

const Plans = () => {

  return (
    <div>Plans</div>
  )
}

export default Plans