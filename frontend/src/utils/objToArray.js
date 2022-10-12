export const objToArray = function (obj){
    const array = []
    let objFinal = {}
    for (let key in obj){
        objFinal.unidad=key
        objFinal.data=obj[key]
        array.push(objFinal)
        objFinal={}
    }
    return array
}