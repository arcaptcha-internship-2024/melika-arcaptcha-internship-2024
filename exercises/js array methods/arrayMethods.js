numbers = [1,2,3,4,5,6,7,8,9,10]

function evenNumbers(numbers){
    evenNumbers = []
    for(let i=0; i<numbers.length; i++){
        if(numbers[i] % 2 == 0 ){
            evenNumbers.push(numbers[i])
        }
    }
    // console.log(evenNumbers)
    return evenNumbers
}

function square(numbers){
    let squaredNumbers = numbers.map(element => element * element)
    return squaredNumbers
}

document.getElementById("evenNumbers").innerHTML = '[' + evenNumbers(numbers) + ']'
document.getElementById("squaredNumbers").innerHTML = '[' + square(numbers) + ']'
