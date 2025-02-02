import { Stack } from "@mui/material";
import Layout from "../../Screens/Layout";

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
    <Layout>
      <Stack justifyContent={'center'} alignItems={"center"}>
      <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDR3MGJ3cHd1eDFyeXg1dWh2eW14NDZoZGU3dDJ5NmNzOXhlOHJmYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/opDRL3H2A9iLNuvbOv/giphy.gif" />
      </Stack>
    </Layout>
  )
}

export default Plans