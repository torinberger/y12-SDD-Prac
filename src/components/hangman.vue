<template>
  <div class="hangman" v-bind:style="{ backgroundImage: background }">
    <div id="container">
      <div id="score-container">
        <h2>{{ wins }} - {{ losses }}</h2>
        <button type="button" @click="resetScore()">RESET SCORE</button>
      </div>
      <h1>Hangman</h1>
      <div id="image-container">
        <img v-if="lives == 6" src="../assets/hangman/Hangman-0.png" alt="">
        <img v-if="lives == 5" src="../assets/hangman/Hangman-1.png" alt="">
        <img v-if="lives == 4" src="../assets/hangman/Hangman-2.png" alt="">
        <img v-if="lives == 3" src="../assets/hangman/Hangman-3.png" alt="">
        <img v-if="lives == 2" src="../assets/hangman/Hangman-4.png" alt="">
        <img v-if="lives == 1" src="../assets/hangman/Hangman-5.png" alt="">
        <img v-if="lives == 0" src="../assets/hangman/Hangman-6.png" alt="">
      </div>
      <div id="word-container">
        <h2 id="word"> {{ displayWord }} </h2>
      </div>
      <div id="keys-container">
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
      <div id="reset-container">
        <button @click="reset(); resetEasy();">NEW GAME EASY</button>
        <button @click="reset(); resetMedium();">NEW GAME MEDIUM</button>
        <button @click="reset(); resetHard();">NEW GAME HARD</button>
      </div>
    </div>
  </div>
</template>

<script>


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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function displayInput(word, inputs) {
  var string = "";
  for(var i = 0; i < word.length; i++) { string += "_"; }

  var inWord = word;
  for(var n = 0; n < inputs.length; n++) {
    var rex = new RegExp(String(inputs[n]), "g");
    inWord = inWord.replace(rex, "1")
  }

  for(var k = 0; k < inWord.length; k++) {
    if(inWord[k] == '1') {
      var arr = string.split("");
          arr[k] = word[k];
          string = arr.join("");
    }
  }

  return string.split("").join(" ");
}

function isCorrect(string, token) {
  for(var i = 0; i < string.length; i++) {
    if(string[i] == token) { return true; }
  }
  return false;
}

function isWin(string, tokens) {
  for(var i = 0; i < string.length; i++) {
    if(tokens.indexOf(string[i]) == -1) { return false; }
  }
  return true;
}

export default {
  name: "hangman",
  data() {
    return {
      lives: 6,
      wins: 0,
      losses: 0,
      fullWord: "accept",
      charInputs: [],
      tries: [],
      won: false,
      displayWord: "",
      background: "linear-gradient(to bottom left, rgb(0, 0, 140), rgb(0, 0, 20))"
    }
  },
  methods: {
    addChar(inChar) {
      inChar = inChar.toLowerCase();
      this.tries.push(inChar);
      var win = isCorrect(this.fullWord, inChar);
      if(win) {
        this.charInputs.push(inChar);
        this.displayWord = displayInput(this.fullWord, this.charInputs);
        if(isWin(this.fullWord, this.charInputs)) {
          this.displayWord = this.fullWord.split("").join(" ");
          this.won = true;
          this.wins++;
        }
      } else {
        this.lives--;
        this.background = `linear-gradient(to bottom left, rgb(${this.lives*50}, 0, ${140}), rgb(${this.lives*50}, 0, ${20}))`
        if(this.lives == 0) {
          this.displayWord = this.fullWord.split("").join(" ");
          this.losses++;
        }
      }
    },
    reset() {
      this.lives = 6;
      this.charInputs = [];
      this.tries = [];
      this.displayWord = "";
      this.won = false;
      this.background = `linear-gradient(to bottom left, rgb(${this.lives*50}, 0, ${140}), rgb(${this.lives*50}, 0, ${20}))`
    },
    resetScore() {
      this.wins = 0;
      this.losses = 0;
    },
    resetEasy() {
      var string = "";
      this.fullWord = easy[getRandomInt(easy.length)];
      for(var i = 0; i < this.fullWord.length; i++) { string += "_"; }
      this.displayWord = string.split("").join(" ");
    },
    resetMedium() {
      var string = "";
      this.fullWord = medium[getRandomInt(medium.length)];
      for(var i = 0; i < this.fullWord.length; i++) { string += "_"; }
      this.displayWord = string.split("").join(" ");
    },
    resetHard() {
      var string = "";
      this.fullWord = hard[getRandomInt(hard.length)];
      for(var i = 0; i < this.fullWord.length; i++) { string += "_"; }
      this.displayWord = string.split("").join(" ");
    }
  },
  created() {
    var string = "";
    this.fullWord = medium[getRandomInt(medium.length)];
    for(var i = 0; i < this.fullWord.length; i++) { string += "_"; }
    this.displayWord = string.split("").join(" ");
    this.background = `linear-gradient(to bottom left, rgb(${this.lives*50}, 0, ${140}), rgb(${this.lives*50}, 0, ${20}))`
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

#score-container button {
  width: 15vw;
  height: 2vw;
  font-size: 3vh;
  border-radius: 2px;
  margin: 5px;
  background: black;
  color: white;
}

#score-container button:hover {
  background: grey;
}

h1 {
  padding-top: 12vh;
  text-align: center;
  font-size: 5vh;
  margin: 10px;
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

#reset-container {
  margin-top: 10px;
  width: 80%;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  justify-content: center;
}

#reset-container button {
  width: 20vw;
  height: 2vw;
  font-size: 3vh;
  border-radius: 2px;
  margin: 5px;
  background: black;
  color: white;
}

#reset-container button:hover {
  background: grey;
}

.key {
  width: 5vw;
  height: 2vw;
  border-radius: 2px;
  margin: 5px;
  font-size: 3vh;
  background: #e0e0e0;
}

.key:hover {
  background: grey;
}

#word {
  text-align: center;
}

.key:disabled {
  background: black;
  color: white;
}


</style>
