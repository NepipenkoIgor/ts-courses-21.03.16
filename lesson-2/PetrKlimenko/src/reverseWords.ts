export default (sentence: string): string => {
    let result: string[] = [];

    for (let word of sentence.split(/\s/g)) {
        let cleanWord: string = word.replace(/(\W|\d)/g, "");
        let reversedWord: string = cleanWord.split("").reverse().join("");

        let resultWord: string = "";
        let i = 0;

        for (let c of word.split(""))
            resultWord += (c.match(/(\d|\W)/)) ? c : reversedWord[i++];
        
        result.push(resultWord);
    }

    return result.join(" ");
}
