export const centro = (obj)=>{
    let media=[0,0]
    let contador=0
    for (let key in obj){
        media[0]=media[0]+obj[key].coordenadas[0]
        media[1]=media[1]+obj[key].coordenadas[1]
        contador++
    }
    media[0]=media[0]/contador
    media[1]=media[1]/contador
    return media
}