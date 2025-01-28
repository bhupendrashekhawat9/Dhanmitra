import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Progress from "../../customComponents/Progress";
interface props {
    data: {label:string;value:number;target:number,minValue:number,maxValue:number}[]
}
const CategoryExpenditure = ({data}:props) => {
    console.log(data)
    return (
        <div>
          {
            data.map((i,key)=>{
                return <>
                <Stack margin={"2rem 0"}>
                    <Typography fontWeight={400}>
                        {i.label}
                    </Typography>
                    <Stack>
                        <Progress value={i.value} maxValue={i.maxValue} minValue={i.minValue} target={i.target}/>
                    </Stack>
                </Stack>
                </>
            })
          }
        </div>
      );
    }
export default CategoryExpenditure