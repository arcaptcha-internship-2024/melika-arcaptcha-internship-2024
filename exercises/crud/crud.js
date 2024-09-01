

function create(){
    let arrayName = []
    return arrayName
}

function readElement(array, index){
    return array[index]
}

function printArray(array){
    console.log(array)
}

function update(array, index, newValue){
    array[index] = newValue
}

function addElement(array, newValue){
    array.push(newValue)
}

function deleteElement(array, index){
    array.splice(index,1)
}

let animals = create()
addElement(animals,'dog')
addElement(animals,'cat')
printArray(animals)


