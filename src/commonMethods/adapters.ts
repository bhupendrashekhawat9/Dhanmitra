export const toLocal = (value: number | bigint | string, ref: "currency" | "percent") => {
    if (value || value === 0) {  // Check for valid value (also allows 0)
        // Convert value to number if it's a string or bigint
        const numericValue = typeof value === 'bigint' ? Number(value) : value;

        // Formatting based on the 'ref' type
        let options: Intl.NumberFormatOptions = {};
        
        switch (ref) {
            case 'currency':
                options = {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                };
                break;

            case 'percent':
                options = {
                    style: 'percent',
                    maximumFractionDigits: 2,
                };
                break;
            
            default:
                return '';
        }

        // Format value
        return new Intl.NumberFormat('hi-IN', options).format(numericValue as number);
    }
    
    return "";  // Return empty string if value is not provided or invalid
};

export const capitalize = (input:string|null, style?:"ALL"|"FIRST LETTER OF ALL"|"FIRST LETTER OF FIRST WORD")=>{
    if(input){
        
        let capitalizedWord = new String(input);
        capitalizedWord  = input.toLocaleLowerCase()
        capitalizedWord[0].toLocaleUpperCase()
        return capitalizedWord;
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