export const timeFormat = (date)=>{
    let output = `${date.slice(8,10)}-${date.slice(5,7)}-${date.slice(0,4)} ${date.slice(11,13)}:${date.slice(14,16)}:${date.slice(17,19)}`
    return output
}