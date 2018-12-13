<template>
  <!-- containing div of component w/dynamic background -->
  <div class="hangman" v-bind:style="{ backgroundImage: background }">
    <!-- game container -->
    <div id="container">

      <div id="score-container">
        <!-- format and display score -->
        <h2>{{ wins }} - {{ losses }}</h2>
        <!-- reset score button w/click event -->
        <button type="button" @click="resetScore()">RESET SCORE</button>
      </div>

      <h1>Hangman</h1>

      <!-- dynamically display the correct hangman diagram dependent on lives -->
      <div id="image-container">
        <img class="hang-image" v-if="lives == 6" src="../assets/hangman/Hangman-0.png" alt="">
        <img class="hang-image" v-if="lives == 5" src="../assets/hangman/Hangman-1.png" alt="">
        <img class="hang-image" v-if="lives == 4" src="../assets/hangman/Hangman-2.png" alt="">
        <img class="hang-image" v-if="lives == 3" src="../assets/hangman/Hangman-3.png" alt="">
        <img class="hang-image" v-if="lives == 2" src="../assets/hangman/Hangman-4.png" alt="">
        <img class="hang-image" v-if="lives == 1" src="../assets/hangman/Hangman-5.png" alt="">
        <img class="hang-image" v-if="lives == 0" src="../assets/hangman/Hangman-6.png" alt="">
      </div>

      <!-- display hidden word and slowly reveal -->
      <div id="word-container">
        <h2 id="word"> {{ displayWord }} </h2>
      </div>

      <!-- container for all alphabetical keys -->
      <div id="keys-container">
        <!-- dynamic css & disabling buttons w/click events -->
        <button :disabled="tries.indexOf('a') >= 0 || lives == 0 || won" @click="addChar('A')" class="key">A</button>
        <button :disabled="tries.indexOf('b') >= 0 || lives == 0 || won" @click="addChar('B')" class="key">B</button>
        <button :disabled="tries.indexOf('c') >= 0 || lives == 0 || won" @click="addChar('C')" class="key">C</button>
        <button :disabled="tries.indexOf('d') >= 0 || lives == 0 || won" @click="addChar('D')" class="key">D</button>
        <button :disabled="tries.indexOf('e') >= 0 || lives == 0 || won" @click="addChar('E')" class="key">E</button>
        <button :disabled="tries.indexOf('f') >= 0 || lives == 0 || won" @click="addChar('F')" class="key">F</button>
        <button :disabled="tries.indexOf('g') >= 0 || lives == 0 || won" @click="addChar('G')" class="key">G</button>
        <button :disabled="tries.indexOf('h') >= 0 || lives == 0 || won" @click="addChar('H')" class="key">H</button>
        <button :disabled="tries.indexOf('i') >= 0 || lives == 0 || won" @click="addChar('I')" class="key">I</button>
        <button :disabled="tries.indexOf('j') >= 0 || lives == 0 || won" @click="addChar('J')" class="key">J</button>
        <button :disabled="tries.indexOf('k') >= 0 || lives == 0 || won" @click="addChar('K')" class="key">K</button>
        <button :disabled="tries.indexOf('l') >= 0 || lives == 0 || won" @click="addChar('L')" class="key">L</button>
        <button :disabled="tries.indexOf('m') >= 0 || lives == 0 || won" @click="addChar('M')" class="key">M</button>
        <button :disabled="tries.indexOf('n') >= 0 || lives == 0 || won" @click="addChar('N')" class="key">N</button>
        <button :disabled="tries.indexOf('o') >= 0 || lives == 0 || won" @click="addChar('O')" class="key">O</button>
        <button :disabled="tries.indexOf('p') >= 0 || lives == 0 || won" @click="addChar('P')" class="key">P</button>
        <button :disabled="tries.indexOf('q') >= 0 || lives == 0 || won" @click="addChar('Q')" class="key">Q</button>
        <button :disabled="tries.indexOf('r') >= 0 || lives == 0 || won" @click="addChar('R')" class="key">R</button>
        <button :disabled="tries.indexOf('s') >= 0 || lives == 0 || won" @click="addChar('S')" class="key">S</button>
        <button :disabled="tries.indexOf('t') >= 0 || lives == 0 || won" @click="addChar('T')" class="key">T</button>
        <button :disabled="tries.indexOf('u') >= 0 || lives == 0 || won" @click="addChar('U')" class="key">U</button>
        <button :disabled="tries.indexOf('v') >= 0 || lives == 0 || won" @click="addChar('V')" class="key">V</button>
        <button :disabled="tries.indexOf('w') >= 0 || lives == 0 || won" @click="addChar('W')" class="key">W</button>
        <button :disabled="tries.indexOf('x') >= 0 || lives == 0 || won" @click="addChar('X')" class="key">X</button>
        <button :disabled="tries.indexOf('y') >= 0 || lives == 0 || won" @click="addChar('Y')" class="key">Y</button>
        <button :disabled="tries.indexOf('z') >= 0 || lives == 0 || won" @click="addChar('Z')" class="key">Z</button>
      </div>

      <!-- new game buttons -->
      <div id="new-game-container">
        <button @click="newGame(); newGameEasy();">NEW GAME EASY</button>
        <button @click="newGame(); newGameMedium();">NEW GAME MEDIUM</button>
        <button @click="newGame(); newGameHard();">NEW GAME HARD</button>
      </div>

    </div>
  </div>
</template>

<script>

// easy words
var easy = [
  'able',
  'about',
  'above',
  'accept',
  'across',
  'act',
  'action',
  'add',
  'admit',
  'adult',
  'affect',
  'after',
  'blaring',
  'blushed',
  'booked',
  'cereal'
]

// medium words
var medium = [
  'ability',
  'account',
  'activity',
  'actually',
  'address',
  'according',
  'administration',
  'chimpanzee',
  'chimpanzees',
  'chimps',
  'chin',
  'china',
  'chinese',
  'chink',
  'chinked',
  'chinking',
  'chinks',
  'chinless'
]

// hard words
var hard = [
  'abomasum',
  'absquatulate',
  'adscititious',
  'albertopolis',
  'amphisbaena',
  'anguilliform',
  'breatharian',
  'callithumpian',
  'floccinaucinihilipilification',
  'bridgebuilding'
]

// get random int from 0-max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// clean input and hide un-guessed letters
function cleanInput(word, inputs) {
  var string = ""; // create placeholder string
  for(var i = 0; i < word.length; i++) { string += "_"; } // fill with underscores

  var inWord = word; // create placeholder word
  for(var n = 0; n < inputs.length; n++) {
    var rex = new RegExp(String(inputs[n]), "g"); // get regex that targets all iterated characters
    inWord = inWord.replace(rex, "1"); // replace iterated character with placeholder '1'
  }

  for(var k = 0; k < inWord.length; k++) { // go through placeholder word
    if(inWord[k] == '1') { // check if letter guessed
      var arr = string.split(""); // if so reveal the letter
          arr[k] = word[k];
          string = arr.join("");
    }
  }

  return string.split("").join(" "); // show the hidden/revealed letters w/a space inbetween
}

// check if a token is in a string
function isCorrect(string, token) {
  for(var i = 0; i < string.length; i++) { // loop through string
    if(string[i] == token) { return true; }
  }
  return false; // if token not in string return false
}

// check if all string's characters are in tokens
function isWin(string, tokens) {
  for(var i = 0; i < string.length; i++) { // loop through string
    if(tokens.indexOf(string[i]) == -1) { return false; } // if character not on tokens
  }
  return true; // all string's characters in tokens
}

export default { // vue instance
  name: "hangman",
  data() {
    return { // vue variables
      lives: 6, // player lives
      wins: 0, // player wins
      losses: 0, // player losses
      fullWord: "l o a d i n g . . .", // word to guess
      charInputs: [], // array of all inputs
      tries: [], // array of all tried characters
      won: false, // won boolean
      displayWord: "", // word to display
      background: "linear-gradient(to bottom left, rgb(0, 0, 140), rgb(0, 0, 20))" // dynamic background
    }
  },
  methods: {
    addChar(inChar) { // when a letter clicked
      inChar = inChar.toLowerCase(); // make char lowercase
      this.tries.push(inChar); // add char to tries
      var win = isCorrect(this.fullWord, inChar); // check if guess correct

      if(win) { // if guess correct
        this.charInputs.push(inChar); // add to char
        this.displayWord = cleanInput(this.fullWord, this.charInputs); // show revealed letters

        if(isWin(this.fullWord, this.charInputs)) { // check if user completed word
          this.displayWord = this.fullWord.split("").join(" "); // show full word
          this.won = true;
          this.wins++; // increase score
        }
      } else { // if guess incorrect
        this.lives--; // reduce lives & change hangman pic
        // change dymanic background
        this.background = `linear-gradient(to bottom left, rgb(${this.lives*50}, 0, ${140}), rgb(${this.lives*50}, 0, ${20}))`

        // if hangman complete
        if(this.lives == 0) {
          // show full word
          this.displayWord = this.fullWord.split("").join(" ");
          this.losses++; // increase losses score
        }
      }
    },
    newGame() { // if new game made
      // reset all vue variables to default
      this.lives = 6;
      this.charInputs = [];
      this.tries = [];
      this.displayWord = "";
      this.won = false;
      this.background = `linear-gradient(to bottom left, rgb(${this.lives*50}, 0, ${140}), rgb(${this.lives*50}, 0, ${20}))`
    },
    resetScore() { // reset scores
      this.wins = 0;
      this.losses = 0;
    },
    newGameEasy() { // set word to easy word
      var string = ""; // placeholder string
      this.fullWord = easy[getRandomInt(easy.length)]; // get word
      for(var i = 0; i < this.fullWord.length; i++) { string += "_"; } // hide letters
      this.displayWord = string.split("").join(" "); // show underscores with spacing
    },
    newGameMedium() { // set word to medium word
      var string = ""; // placeholder string
      this.fullWord = medium[getRandomInt(medium.length)]; // get word
      for(var i = 0; i < this.fullWord.length; i++) { string += "_"; } // hide letters
      this.displayWord = string.split("").join(" "); // show underscores with spacing
    },
    newGameHard() { // set word to hard word
      var string = ""; // placeholder string
      this.fullWord = hard[getRandomInt(hard.length)]; // get word
      for(var i = 0; i < this.fullWord.length; i++) { string += "_"; } // hide letters
      this.displayWord = string.split("").join(" "); // show underscores with spacing
    }
  },
  created() { // when program loaded
    // set up medium game
    var string = ""; // placeholder string
    this.fullWord = medium[getRandomInt(medium.length)]; // get medium word
    for(var i = 0; i < this.fullWord.length; i++) { string += "_"; } // hide letters
    this.displayWord = string.split("").join(" "); // display hidden letters

    // dynamically update background
    this.background = `linear-gradient(to bottom left, rgb(${this.lives*50}, 0, ${140}), rgb(${this.lives*50}, 0, ${20}))`
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* # containers # */

.hangman {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#container {
  width: 80vw;
  height: 80vh;
  background: white;
  border-radius: 3px;
}

#score-container {
  position: absolute;
  text-align: center;
  width: 80vw;
  margin-top: 2vw;
}


#image-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

#keys-container {
  margin-top: 10px;
  width: 80%;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  justify-content: center;
}

#new-game-container {
  margin-top: 10px;
  width: 80%;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  justify-content: center;
}

/* # inputs # */

#score-container button {
  width: 15vw;
  height: 2vw;
  font-size: 3vh;
  border-radius: 2px;
  margin: 5px;
  background: black;
  color: white;
  height: auto;
  width: auto;
  padding: 0.5vh;
}

#score-container button:hover {
  background: grey;
}

#new-game-container button {
  width: 20vw;
  height: auto;
  font-size: 3vh;
  border-radius: 2px;
  margin: 5px;
  background: black;
  color: white;
}

#new-game-container button:hover {
  background: grey;
}

.key {
  width: 5vw;
  height: auto;
  border-radius: 2px;
  margin: 5px;
  font-size: 3vh;
  background: #e0e0e0;
}

.key:hover {
  background: grey;
}

.key:disabled {
  background: black;
  color: white;
}

/* # text # */

h1 {
  padding-top: 12vh;
  text-align: center;
  font-size: 5vh;
  margin: 10px;
}

#word {
  text-align: center;
}

@media only screen and (max-width: 800px) {
  #keys-container {
    display: block;
    text-align: center;
  }

  .key {
    padding: 0.5vw;
  }

  .hang-image {
    height: 20vh;
    width: 20vh;
  }

  h1, #word, h2 {
    font-size: 3vh;
  }

  #new-game-container button {
    font-size: 3vw;
  }

}

</style>
