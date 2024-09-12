function selectRandomElements(number, array){
    let result = []
    let length = array.length
    
    for(let i=0; i<number; i++, length--){
        let randomIndex = randomNumber(length)
        result.push(array[randomIndex])
        array.splice(randomIndex,1)
    }
    return result
}

function randomNumber(max){
    return Math.floor(Math.random() * max)
}


const myArray = [1,2,3,4,5]
result = selectRandomElements(4,myArray)
console.log(result)