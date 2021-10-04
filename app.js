//what do we need to do to create game?
// 1) get a word from the dictionary array that is 6 letters long
// 2) go through and find all possible words from subsets of letters that are at least 3 letters long
    // would be good to save all possible words to array. would take awhile at start of game but make for smooth gameplay
// 3) display the root word at the top of the console with letters scrambled
// 4) display the list of sub words with the letters hidden by "-"
// 5) game loop that continuously prompts users for input and will alert user of state of their guess
let gameDict = [];
let rootWords = [];
let subWords = [];

/* 
takes full dictionary and takes out the words of appropriate length for our game
*/
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

/* 
function to get a random int: used when getting a random rootword
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * takes the list of 6 letter long words and picks a random one
 * @return the root word randomly chosen
 */
function getRootWord(){
    let root = rootWords[getRandomInt(rootWords.length)];
    return root;
}

/**
 * checks if a string is a substring of a word
 */
function hasSubString(str, sub) {
    return str.indexOf(sub) !== -1;
}

/**
 * takes the rootWord and goes through the list of game words to find the substrings
 */
function getSubWords(){
    //compare root word to words in game dict
    //compare the letters, make sure each letter only appears a max of once
    //save the subset of words to new array
    let rootWord = getRootWord();

    for (let i = 0; i < gameDict.length; i++){
        if (hasSubString(rootWord, gameDict[i])){
            subWords.push(gameDict[i]);
        }
    }
}

/**
 * function that runs the game
 * includes the game loop that constantly prompts users for guesses until the game ends
 */
function Game (){
    gameDictionary();
    getSubWords();
    let guesses = [];
    let loopCounter = 0;
    subWords.sort();

    for (let i = 0; i < subWords.length; i++){
        //go through all the words and create a new string of same length but with -
        //print each string to console line by line
        let str = "";
        for (let j = 0; j < subWords[i].length; j++){
            str += "-";
        }
        guesses.push(str);
    }

    console.log(subWords[subWords.length - 1]);

    for (let k = 0; k < guesses.length; k++){
        console.log(guesses[k]);
    }
 
    let userInput = prompt("guess a word");
    while (loopCounter < subWords.length){
        //if they enter a *
            //clear console
            //print the list of words to the console
            //alert user they ended game
            //leave while loop
        if (userInput === null){
            console.clear();
            for (let i = 0; i < subWords.length; i++){
                console.log(subWords[i]);
            }
            alert("game has been ended, words now revealed");
            break;
        }
        //if they guess something too short or long
            //alert user they guessed an invalid word
            //keep console looking the same
        else if (userInput.length < 3 || userInput > 6){
            alert("guess was too short or long");
        }
        //if they guess a word they already have
            //alert user they already guessed that word
            //keep console the same
        else if (guesses.includes(userInput)){
            alert("word already been guessed");
        }
        //if they guess a word that is not in the sublist of words
            //alert user the word they guessed is not in the sublist of words
            //keep console the same
        else if (subWords.indexOf(userInput) === -1){
            alert("word not in list of words");
        }
        //if they guess a word, replace the - string with word of equivalent index in subWords
            //alert user they are correct
            //clear the console
            //print updated list of words and guesses
            // if clause: (subWords.indexOf(userInput) !== -1)
        else{
            guesses.splice(subWords.indexOf(userInput), subWords.indexOf(userInput), userInput);
            alert("you guessed a word!");
            console.clear();
            console.log(subWords[subWords.length -1]); //TO DO: change to variable, allow for randomizing word
            for (let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
            loopCounter++;
        }
        //prompt user for next guess
        userInput = prompt("guess another word");
    }
    
}

Game();
