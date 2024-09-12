function selectRandomElements(number, array){
    let result = []
    
    
    for(let i=0; i<number; i++){
        let length = array.length
        let randomIndex = Math.floor(Math.random() * length)
        result.push(array[randomIndex])
        array.splice(randomIndex,1)
    }
    return result
}


const myArray = [1,2,3,4,5]
result = selectRandomElements(4,myArray)
console.log(result)