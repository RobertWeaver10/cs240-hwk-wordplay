//what do we need to do to create game?
// 1) get a word from the dictionary array that is 6 letters long
// 2) go through and find all possible words from subsets of letters that are at least 3 letters long
    // would be good to save all possible words to array. would take awhile at start of game but make for smooth gameplay
// 3) display the root word at the top of the console with letters scrambled
// 4) display the list of sub words with the letters hidden by "-"
// 5) game loop that continuously prompts users for input and will alert user of state of their guess
let gameDict = [];
let rootWords = [];

function gameDictionary(){
    for (let i = 0; i < dictionary.length; i++){
        if(dictionary[i].length == 6){
            rootWords.push(dictionary[i]);
        }
        if(dictionary[i].length > 2 && dictionary[i].length < 7){
            gameDict.push(dictionary[i]);
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRootWord(){
    let rootWord = rootWords[getRandomInt(rootWords.length)];
    return rootWord;
}

function getSubWords(){
    //make array with root word in it letter by letter
    //loop through gameDict 
}

gameDictionary();
console.log("------");