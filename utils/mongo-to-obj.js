
export function mongoToObj(objMongo){
    return JSON.parse(JSON.stringify(objMongo))
}