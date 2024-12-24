import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { EmiType } from '../../types/Emi';
import { getAllData } from '../../indexDB/database';
import { toLocal } from '../../commonMethods/adapters';
import ProgressCard from '../../customComponents/ProgressCard';
import { Stack, Typography } from '@mui/material';

const EMIExtendedKPI = (refresh) => {
    const [emiData, setemiData] = useState({
        totalLoanAmount:0,
        currentMonthInstallment:0
      })
      const [allEmi, setAllEmi] = useState([])
      let totalCount = 2;
      let installmemtAmount = toLocal(15000,'currency');
      let getAllEmi = async ()=>{
        
        let data: EmiType[] = await getAllData("EMIs") as EmiType[]
        let currentMonthInstallment = 0;
        let totalLoanAmount = 0;
        let date = new Date();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();
    
        data.forEach((i:EmiType)=>{
            
            if(moment(i.endDate) > moment()){
              totalLoanAmount+=parseInt(i.loanAmount);
              currentMonthInstallment+=parseInt(i.installmentAmount)
            }
        })
        
    setAllEmi(data)
      setemiData({
        totalLoanAmount,
        currentMonthInstallment
      })
      
      }
    
      useEffect(() => {
        
          if(refresh){
            getAllEmi()
          }
      }, [refresh])
      
  return (
    <div style={{
        padding:".5rem",
    }}>
        {
            allEmi.map((i:EmiType,index)=>{
                return <ProgressCard progress={60-index*10} progressColor='red' >
                      <Stack direction={'row'} justifyContent={"space-between"} sx={{
                        padding:".5rem"
                      }}>

                        <Typography fontWeight={600}>
                            {i.loanName}
                        </Typography>
                        <Typography fontWeight={600}>
                            {toLocal(i.loanAmount,'currency')}
                        </Typography>
                        
                      </Stack>
                    </ProgressCard>
            })
        }
    </div>
  )
}

export default EMIExtendedKPI