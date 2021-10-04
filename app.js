let gameDict = [];
let rootWords = [];
let subWords = [];
let root = ``;
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
          
    root = arr.join('');                // Convert Array to string
    return root;                        // Return shuffled string
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
 * takes the rootWord and goes through the list of game words to find the substrings
 */
function getSubWords(){
    for (let i = 0; i < gameDict.length; i++){ //compare root word to game dictionary
        if (hasSubString(root, gameDict[i])){  //if the word at i in game dict is a substring of root
            subWords.push(gameDict[i]); //save the subset of words to new array
        }
    }
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
    //randomizeRoot();
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

    console.log(`root word: ` + root); //print the shuffled root word

    for (let i = 0; i < guesses.length; i++){ //print the guesses array line by line
        console.log(guesses[i]);
    }
 
    //Game loop
    while (loopCounter < subWords.length){
        let userInput = prompt("guess a word");

        if (userInput === null){ 
            console.clear();
            for (let i = 0; i < subWords.length; i++){
                console.log(subWords[i]);
            }
            alert("game has been ended, words now revealed");
            break;
        }

        else if (userInput === `*`){
            console.clear();
            randomizeRoot();
            console.log(root);
            for(let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
        }
        
        else if (userInput.length < 3 || userInput > 6){
            alert("guess was too short or long");
            console.clear();
            console.log(root);
            for(let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
        }
        
        else if (guesses.includes(userInput)){
            alert("word already been guessed");
            console.clear();
            console.log(root);
            for(let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
        }
        
        else if (subWords.indexOf(userInput) === -1){
            alert("word not in list of words");
            console.clear();
            console.log(root);
            for(let i = 0; i < guesses.length; i++){
                console.log(guesses[i]);
            }
        }
        
        else{
            var tempIndex = subWords.indexOf(userInput);
            var temp = subWords[tempIndex];
            guesses[tempIndex] = temp;

            alert("you guessed a word!");
            console.clear();
            console.log(root);
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