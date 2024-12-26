import moment from 'moment';
import { ReactNode, useEffect, useState } from 'react'
import { EmiType } from '../../types/Emi';
import { deleteData, getAllData } from '../../indexDB/database';
import { toLocal } from '../../commonMethods/adapters';
import ProgressCard from '../../customComponents/ProgressCard';
import { IconButton, Stack, Typography } from '@mui/material';
import "./EMI.css"
import { getPaidInstallments } from './AddEmi';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { red } from '@mui/material/colors';
interface EMIDetailsType extends EmiType{
  isActive?: boolean;
  pendingAmount?: number;
  paidAmount?: number;
}
const EMIExtendedKPI = (refresh) => {
      const [allEmi, setAllEmi] = useState<EMIDetailsType[]>([])
      let getAllEmi = async ()=>{
        
        let data: EmiType[] = await getAllData("EMIs") as EmiType[]
     let modifiedData:EMIDetailsType[] = []
    
        data.forEach((i:EmiType)=>{
            let t:EMIDetailsType = {...i};
            if(moment(i.endDate) > moment()){
             t.isActive = true;
             t.pendingAmount = getPaidInstallments(new Date(t.endDate), t.installmentType)*parseInt(t.installmentAmount);
             t.paidAmount = parseInt(t.loanAmount)- getPaidInstallments(new Date(t.endDate), t.installmentType)*parseInt(t.installmentAmount)
            }
            modifiedData.push(t)
        })
        
    setAllEmi(modifiedData)
  
      
      }

      let handleDelete:(emi:EMIDetailsType)=> void = (emi)=>{
        setAllEmi((prev)=>{
          return prev.filter((i)=> i.id !== emi.id)
        })
          deleteData(emi.id,"EMIs")
      }
      let getDetailComponent: (data:EMIDetailsType)=>ReactNode = (data)=>{
        let component = <>
        <Stack direction={'row'} justifyContent={'space-between'}>

         
        <Stack direction={"column"} justifyContent={'space-between'}>
            <Typography>
                Paid Amount
            </Typography>
            <Typography fontWeight={600}>
                {toLocal(data.paidAmount,"currency")}
            </Typography>
        </Stack>
       
        <Stack direction={"column"} justifyContent={'space-between'}>
            <Typography>
                Pending Amount
            </Typography>
            <Typography fontWeight={600}>
                {toLocal(data.pendingAmount,"currency")}
            </Typography>
        </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'.5rem 0'}>
        <Stack direction={"row"} justifyContent={'space-between'}>
            <Typography fontWeight={600}>
                Active
            </Typography>
                <ToggleOnIcon/>
           
        </Stack>
        <IconButton size='small' sx={{color:red[900]}} onClick={()=>handleDelete(data)}>
          <DeleteIcon/>
        </IconButton>
        </Stack>
        </>

        return component;
      }
      useEffect(() => {
        
          if(refresh){
            getAllEmi()
          }
      }, [refresh])
      
  return (
    <div className='emi_extended_kpi_container' style={{
        padding:".5rem",
       
    }}>
        {
            allEmi.map((i:EMIDetailsType,index)=>{
              let detailComponent:ReactNode = getDetailComponent(i)
              let completed = (i.paidAmount/parseInt(i.loanAmount)) *100
                return <ProgressCard detailComponent={detailComponent}  progress={`${completed}`} progressColor='green' >
                      <Stack direction={'row'} justifyContent={"space-between"} sx={{
                        padding:".5rem"
                      }}>

                        <Typography fontWeight={600}>
                            {i.loanName}
                        </Typography>
                        <Typography fontWeight={600}>
                            {toLocal(i.loanAmount,'currency') as string}
                        </Typography>
                        
                      </Stack>
                    </ProgressCard>
            })
        }
    </div>
  )
}

export default EMIExtendedKPI