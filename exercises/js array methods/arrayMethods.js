numbers1 = [1,2,3,4,5,6,7,8,9,10]
numbers2 = [1,2,3,4,5]
numbers3 = [1,2,3,4,5,6,7,8]

function evenNumbers(numbers){
    evenNumbers = []
    for(let i=0; i<numbers.length; i++){
        if(numbers[i] % 2 == 0 ){
            evenNumbers.push(numbers[i])
        }
    }
    return evenNumbers
}


function square(numbers){
    let squaredNumbers = numbers.map(element => element * element)
    return squaredNumbers
}


function sum(numbers){
    sum = 0
    for(let i=0; i<numbers.length; i++){
        sum += numbers[i]
    }
    return sum
}


function greaterThan(numbers, base){
    firstNumberGreaterThanBase = 0
    for(let i=0; i<numbers.length; i++){
        if(numbers[i]>base){
            firstNumberGreaterThanBase = numbers[i]
            break
        }
    }
    return firstNumberGreaterThanBase
}


function


document.getElementById("evenNumbers").innerHTML = '[' + evenNumbers(numbers1) + ']'
document.getElementById("squaredNumbers").innerHTML = '[' + square(numbers2) + ']'
document.getElementById("ArrayElementSum").innerHTML = sum(numbers2)
document.getElementById("greaterThanFive").innerHTML = greaterThan(numbers3,5)
