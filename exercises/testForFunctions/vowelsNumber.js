function countVowels(inputString) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let vowelsNumber = 0;
    let char = ''
    for (char of inputString) {
        if (vowels.includes(char)) {
            vowelsNumber++;
        }
    }

    return vowelsNumber;
}
export { countVowels };
console.log(countVowels("hello world melika"))