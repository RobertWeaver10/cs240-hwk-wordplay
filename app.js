let gameDict = [];
let rootWords = [];
let subWords = [];
let root = ``;
let scrambleRoot = ``;

/**
 * found on stack overflow after seeing that in a few cases there would be special characters
 * in the list of subwords. figured i should add in to handle this.
 * takes a string and returns true if the string does not contain special characters
 * @param {*} str the string we want to check for special characters
 * @returns true when input string has no special characters
 */
function isValid(str){
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

/* 
takes full dictionary and takes out the words of appropriate length for our game
*/
function gameDictionary(){
    for (let i = 0; i < dictionary.length; i++){
        var valid = true;
        if(dictionary[i].length == 6){
            rootWords.push(dictionary[i]);
        }
        if(dictionary[i].length > 2 && dictionary[i].length < 7 && isValid(dictionary[i])){
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
 * @returns the root word randomly chosen
 */
function getRootWord(){
    root = rootWords[getRandomInt(rootWords.length)];
    return root;
}

/**
 * takes the root word and then randomizes the letters
 * @returns the shuffled root word
 */
function randomizeRoot(){
    var arr = root.split(``);
    var n = arr.length;
    for(var i=0 ; i<n-1 ; ++i) {
        var j = getRandomInt(n);       // Get random of [0, n-1]
            
        var temp = arr[i];             // Swap arr[i] and arr[j]
        arr[i] = arr[j];
        arr[j] = temp;
    }
          
    scrambleRoot = arr.join('');                // Convert Array to string
    return scrambleRoot;                        // Return shuffled string
}


/**
 * takes two strings and checks whether sub is a substring of str
 * @param {*} str 
 * @param {*} sub 
 * @returns true if sub is a substring of str, if not returns false
 */
function hasSubString(str, sub) {
    return str.indexOf(sub) !== -1;
}

/**
 * takes a string word, splits it into an array, then it goes and counts
 * how many times each letter appears in the word and increments
 * the appropriate index in the Letters array
 * @returns the array with the counts of each letter in the root word
 */
function getLetterArr(str){
    var Arr = str.split(``);
    var Letters = new Array(26);
    for (var i = 0; i < Letters.length; i++){
        Letters[i] = 0;
    }
    for (var i = 0; i < Arr.length; i++){ //had to hard code, didnt know how to do any other way
        if (Arr[i] === `a`){
            Letters[0]++;
        }
        else if (Arr[i] === `b`){
            Letters[1]++;
        }
        else if (Arr[i] === `c`){
            Letters[2]++;
        }
        else if (Arr[i] === `d`){
            Letters[3]++;
        }
        else if (Arr[i] === `e`){
            Letters[4]++;
        }
        else if (Arr[i] === `f`){
            Letters[5]++;
        }
        else if (Arr[i] === `g`){
            Letters[6]++;
        }
        else if (Arr[i] === `h`){
            Letters[7]++;
        }
        else if (Arr[i] === `i`){
            Letters[8]++;
        }
        else if (Arr[i] === `j`){
            Letters[9]++;
        }
        else if (Arr[i] === `k`){
            Letters[10]++;
        }
        else if (Arr[i] === `l`){
            Letters[11]++;
        }
        else if (Arr[i] === `m`){
            Letters[12]++;
        }
        else if (Arr[i] === `n`){
            Letters[13]++;
        }
        else if (Arr[i] === `o`){
            Letters[14]++;
        }
        else if (Arr[i] === `p`){
            Letters[15]++;
        }
        else if (Arr[i] === `q`){
            Letters[16]++;
        }
        else if (Arr[i] === `r`){
            Letters[17]++;
        }
        else if (Arr[i] === `s`){
            Letters[18]++;
        }
        else if (Arr[i] === `t`){
            Letters[19]++;
        }
        else if (Arr[i] === `u`){
            Letters[20]++;
        }
        else if (Arr[i] === `v`){
            Letters[21]++;
        }
        else if (Arr[i] === `w`){
            Letters[22]++;
        }
        else if (Arr[i] === `x`){
            Letters[23]++;
        }
        else if (Arr[i] === `y`){
            Letters[24]++;
        }
        else if (Arr[i] === `z`){
            Letters[25]++;
        }
    }
    return Letters;
}

/**
 * takes the rootWord and goes through the list of game words to find the list of words from the subset of letters
 * @returns the list of words formed from a subset of the root word's letters
 */
function getSubWords(){
    var contains = true;
    console.log(contains);
    //call getLetterArr on the root word and save to a var
    var rootLetters = getLetterArr(root);
    //enter loop going through each word in gameDict
    for(var i = 0; i < gameDict.length; i++){
        //create boolean for whether to add word or not
        var contains = true;
        //create new var and save getLetterArr(gameDict[i])
        var wordLetters = getLetterArr(gameDict[i]);
        //enter loop going through each index in root word's letter array
        for(var j = 0; j < 26; j++){
            //if (letterArr2[i] > rootLetter[i]) boolean gets false
            if (wordLetters[j] > rootLetters[j]){
                contains = false;
            }
        }
        //if (boolean is true) push gameDict[i] to subWords
        if (contains === true){
            subWords.push(gameDict[i]);
        }
    }
    return subWords;
}

/**
 * function that runs the game
 * includes the game loop that constantly prompts users for guesses until the game ends
 */
function Game (){
    //Pre game prep
    gameDictionary();
    getRootWord();
    getSubWords();
    randomizeRoot();
    var wordCount = 0;
    var guesses = [];
    var loopCounter = 0;
    subWords.sort((a,b) => a.length - b.length);

    for (let i = 0; i < subWords.length; i++){ //go through all the words and create a new string of same length but with -
        var str = ``;
        for (let j = 0; j < subWords[i].length; j++){ //print each string to console line by line
            str += `-`;
        }
        guesses.push(str);
    }
    guesses.sort((a,b) => a.length - b.length);

    console.log(`root word letters: ` + scrambleRoot); //print the shuffled root word

    for (let i = 0; i < guesses.length; i++){ //print the guesses array line by line
        console.log(guesses[i]);
    }
 
    //Game loop
    while (loopCounter < subWords.length){
        let userInput = prompt("guess a word");
        console.log(subWords);

        if (userInput === null){ 
            console.clear();
            console.log(`root word: ` + root)
            console.log(`you guessed ` + wordCount + ` words out of ` + subWords.length);
            for (let i = 0; i < subWords.length; i++){
                console.log(subWords[i]);
            }
            alert("game has been ended, words now revealed");
            break;
        }

        else if (userInput === `*`){
            console.clear();
            randomizeRoot();
            console.log(`root word letters: ` + scrambleRoot);
            console.log(`you guessed ` + wordCount + ` words out of ` + subWords.length);
            for(let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
        }
        
        else if (userInput.length < 3 || userInput > 6){
            alert("guess was too short or long");
            console.clear();
            console.log(`root word letters: ` + scrambleRoot);
            console.log(`you guessed ` + wordCount + ` words out of ` + subWords.length);
            for(let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
        }
        
        else if (guesses.includes(userInput)){
            alert("word already been guessed");
            console.clear();
            console.log(`root word letters: ` + scrambleRoot);
            console.log(`you guessed ` + wordCount + ` words out of ` + subWords.length);
            for(let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
        }
        
        else if (subWords.indexOf(userInput) === -1){
            alert("word not in list of words");
            console.clear();
            console.log(`root word letters: ` + scrambleRoot);
            console.log(`you guessed ` + wordCount + ` words out of ` + subWords.length);
            for(let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
        }
        
        else{
            var tempIndex = subWords.indexOf(userInput);
            var temp = subWords[tempIndex];
            guesses[tempIndex] = temp;

            alert("you guessed a word!");
            wordCount++;
            console.clear();
            console.log(`root word letters: ` + scrambleRoot);
            console.log(`you guessed ` + wordCount + ` words out of ` + subWords.length);
            for (let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
            if (loopCounter == subWords.length-1){
                alert(`congrats! You won the game!`);
            }
            loopCounter++;
        }
    }
}

Game();