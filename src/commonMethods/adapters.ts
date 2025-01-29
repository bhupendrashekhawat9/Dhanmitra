export const toLocal = (value: number | bigint | string, ref: "currency" | "percent"|"number") => {
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
                case 'number':
                    options = {
                        style: "decimal",
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
        let output =""
        let capitalizedWord = new String(input);
        capitalizedWord  = input.toLowerCase()
       output+=capitalizedWord[0].toUpperCase()+capitalizedWord.slice(1);

        return output;
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
export function getRupeeSymbol() {
    const formatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
    const parts = formatter.formatToParts(1);
  
    // Extract the currency symbol part
    const rupeeSymbol = parts.find(part => part.type === "currency").value;
    return rupeeSymbol;
  }




Object.defineProperties(Array.prototype,{
    _groupBy:{
        value:function<T,K extends keyof T>(key:K):Record<T[K] & string, T[]>{
            return this.reduce((result: Record<T[K] & string, T[]>, item: T) => {
                const groupKey = item[key] as string; // Ensure string type for object keys
                if (!result[groupKey]) {
                  result[groupKey] = [];
                }
                result[groupKey].push(item);
                return result;
              }, {} as Record<T[K] & string, T[]>);
        },
        writable: true,
        configurable: true,
        enumerable: false
    }
})
