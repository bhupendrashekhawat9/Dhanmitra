export const toLocal = (value:number|bigint, ref: "currency"|"percent")=>{
    
    if(value){
        if(ref){
           let  convertedValue = new Intl.NumberFormat('hi-IN',{style:'currency', currency:"INR",maximumFractionDigits:0}).format(value)
            return convertedValue
        }
        return value
    }
    return ""
}
export const capitalize = (input:string|null, style?:"ALL"|"FIRST LETTER OF ALL"|"FIRST LETTER OFF FIRST WORD")=>{
    if(input){
        
        let capitalizedWord = "";
        input  = input.toLocaleLowerCase()
        input[0].toLocaleUpperCase()
        return input;
        // for(let i =0;i< input.length;i++){
        //     let currentLetter = input[i]
        //     if(i ==0){
        //         currentLetter.toUpperCase()
        //     }
        //     capitalizedWord+=currentLetter;
        // }
        // return capitalizedWord;
    }
    return ""
}