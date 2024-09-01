numbers1 = [1,2,3,4,5,6,7,8,9,10]
numbers2 = [1,2,3,4,5]
numbers3 = [1,2,3,4,5,6,7,8]
mixedNumbers = [1,-2,3,4,-5]
fruits = ['banana','apple','orange','mango']

const people = [
    {
        name: 'ali',
        age: 50
    },
    {
        name: 'nima',
        age: 22
    },
    {
        name: 'sara',
        age: 34
    },
    {
        name: 'mojan',
        age: 12
    },
    {
        name: 'ghazaleh',
        age: 5
    },
    {
        name: 'zahra',
        age: 78
    }

]


function midAge(people){
    return people.reduce((totalAge,currentPerson) => (totalAge+currentPerson.age),0)/people.length
}


function olderPeople(people){
    midAge = midAge(people)
    return people.filter(person => person.age > midAge)
}

function evenNumbers(numbers){
    return numbers.filter(element => element%2 == 0)
}


function square(numbers){
    let squaredNumbers = numbers.map(element => element * element)
    return squaredNumbers
}


function sum(numbers){
    return numbers.reduce((currentSum, currentElement) => (currentElement + currentSum),0)
}


function greaterThan(numbers, base){
    return numbers.findIndex(element => element>base)
}


function isNegative(numbers){
    return numbers.some(element => element<0)
}


function concatination(array1, array2){
    return '[' + array1.concat(array2) + ']'
}


function arrayFormat(array){
    return '[' + array + ']'
}

function removeElements(startingIndex, removalNumber,numbers){
    numbers.splice(startingIndex,removalNumber)
    return numbers
}


document.getElementById("evenNumbers").innerHTML = arrayFormat(evenNumbers(numbers1))
document.getElementById("squaredNumbers").innerHTML = arrayFormat(square(numbers2))
document.getElementById("ArrayElementSum").innerHTML = sum(numbers2)
document.getElementById("greaterThanFive").innerHTML = greaterThan(numbers3,5)
document.getElementById("isNegative").innerHTML = isNegative(mixedNumbers) ? 'There is Negative Number in this Array!': 'There is No Negative Number in this Array!'
document.getElementById("allPositive").innerHTML = isNegative(numbers2) ?'There are Negative Elements in this Array':'All Elements in this Array are Positive!'
document.getElementById("stringSort").innerHTML = arrayFormat(fruits.sort())
document.getElementById("concatination").innerHTML =concatination([1,2,3],[4,5,6])
document.getElementById("firstThree").innerHTML = arrayFormat(numbers2.slice(0,3))
document.getElementById("multipleRemove").innerHTML = arrayFormat(removeElements(1,2,numbers2))

console.log(olderPeople(people))
