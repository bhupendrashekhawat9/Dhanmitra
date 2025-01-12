import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Progress from "../../customComponents/Progress";
interface props {
    data: {label:string;value:number;target:number}[]
}
const CategoryExpenditure = ({data}:props) => {
    console.log(data)
    return (
        <div>
          {
            data.map((i,key)=>{
                return <>
                <Stack margin={".5rem 0"}>
                    <Typography>
                        {i.label}
                    </Typography>
                    <Stack>
                        <Progress value={i.value} target={i.target}/>
                    </Stack>
                </Stack>
                </>
            })
          }
        </div>
      );
    }
export default CategoryExpenditure