<template>
  <!-- containing div of component w/dynamic background -->
  <div class="rockPaperScissors" v-bind:style="{ backgroundImage: background }">
    <!-- flex box game container -->
    <div id="game">

      <!-- ally data container -->
      <div id="ally">
        <h2>Ally Score: {{ score.ally }}</h2>

        <!-- ally cards container -->
        <div class="cards">
          <!-- enemy cards w/images, animations & click events -->
          <div class="card" id="allyRock" v-bind:class="{ hide: hide.ally.rock, show: !hide.ally.rock  }" @click="cardSelect('rock')">
            <img src="../assets/rps/rock.png" alt="">
          </div>
          <div class="card" id="allyPaper" v-bind:class="{ hide: hide.ally.paper, show: !hide.ally.paper }" @click="cardSelect('paper')">
            <img src="../assets/rps/paper.png" alt="">
          </div>
          <div class="card" id="allyScissors" v-bind:class="{ hide: hide.ally.scissors, show: !hide.ally.scissors }" @click="cardSelect('scissors')">
            <img src="../assets/rps/scissors.png" alt="">
          </div>
        </div>
      </div>

      <!-- VS container for neatness -->
      <div id="vs">
        <h1>VS</h1>
      </div>

      <!-- enemy data container -->
      <div id="enemy">
        <h2>Enemy Score: {{ score.enemy }}</h2>

        <!-- enemy cards container -->
        <div class="cards">
          <!-- enemy cards w/images & animations -->
          <div class="card enemyCard" id="enemyRock" v-bind:class="{ hide: hide.enemy.rock, show: !hide.enemy.rock }">
            <img src="../assets/rps/rock.png" alt="">
          </div>
          <div class="card enemyCard" id="enemyPaper" v-bind:class="{ hide: hide.enemy.paper, show: !hide.enemy.paper }">
            <img src="../assets/rps/paper.png" alt="">
          </div>
          <div class="card enemyCard" id="enemyScissors" v-bind:class="{ hide: hide.enemy.scissors, show: !hide.enemy.scissors }">
            <img src="../assets/rps/scissors.png" alt="">
          </div>
        </div>
      </div>

    </div>

    <!-- reset button container -->
    <div id="resetContainer">
      <!-- on button click call reset function -->
      <button type="button" @click="reset">Reset Game</button>
    </div>
  </div>
</template>

<script>

// get random number in range
function genRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

// get a random enemy choice
function genEnemyChoice() {
  var enemyChoice = Math.round(genRandomNum(0, 2)); // generate choice
  var possibles = [
    "rock",
    "paper",
    "scissors"
  ];
  return possibles[enemyChoice]; // return translated int -> word
}

// determine winner from ally and enemy choices
function determineWinner(allyChoice, enemyChoice) {
  var lossPairs = { // dictionary to determine what the enemy needs to choose in order for ally to loose
    "rock": "paper",
    "paper": "scissors",
    "scissors": "rock"
  }
  var lossOfAlly = lossPairs[allyChoice]; // get loss pair
  if(lossOfAlly == enemyChoice) { // if ally lost
    return false;
  } else if(allyChoice == enemyChoice) { // if ally chose same as enemy
    return null;
  } else { // if ally won
    return true;
  }
}

export default {
  name: 'tempConverter',
  data() {
    return { // create vue variables
      background: 'linear-gradient(to top right, rgb(160, 160, 160), rgb(100, 100, 120))', // dynamic background
      hide: { // variable to determine whether to hide certain cards
        ally: {
          rock: false,
          paper: false,
          scissors: false
        },
        enemy: {
          rock: false,
          paper: false,
          scissors: false
        }
      },
      score: { // object storing player scores
        ally: 0,
        enemy: 0
      }
    }
  },
  methods: {
    cardSelect(allyChoice) { // when ally chooses a card

      var enemyChoice = genEnemyChoice(); // generate random enemy choice

      // hide other cards of ally
      this.hide.ally.rock = true;
      this.hide.ally.paper = true;
      this.hide.ally.scissors = true;
      this.hide.ally[allyChoice] = false;

      // hide other cards of enemy
      this.hide.enemy.rock = true;
      this.hide.enemy.paper = true;
      this.hide.enemy.scissors = true;
      this.hide.enemy[enemyChoice] = false;

      var win = determineWinner(allyChoice, enemyChoice); // determine if won

      if(win) {
        // set dynamic background
        this.background = 'linear-gradient(to top right, rgb(160, 160, 160), rgb(100, 200, 120))';
        this.score.ally++; // increase ally score
      } else if(win == null) { // if tie
        // set dynamic background
        this.background = 'linear-gradient(to top right, rgb(160, 160, 160), rgb(100, 100, 120))';
      } else {
        // set dynamic background
        this.background = 'linear-gradient(to top right, rgb(160, 160, 160), rgb(200, 100, 120))';
        this.score.enemy++; // increase enemy score
      }

      setTimeout(() => { // delay 1 second
        // show cards of ally
        this.hide.ally.rock = false;
        this.hide.ally.paper = false;
        this.hide.ally.scissors = false;

        // show cards of enemy
        this.hide.enemy.rock = false;
        this.hide.enemy.paper = false;
        this.hide.enemy.scissors = false;
      }, 1000)
    },
    reset() { // if game reset called
      // set dynamic background
      this.background = 'linear-gradient(to top right, rgb(160, 160, 160), rgb(100, 100, 120))';
      // reset scores
      this.score.ally = 0;
      this.score.enemy = 0;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* # containers # */

body {
  margin: 0;
  font-family: sans-serif;
}

.rockPaperScissors {
  width: 100vw;
  height: 90vh;
}

#game {
  width: 100vw;
  height: 85vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#resetContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#ally {
  width: 35vw;
  height: 70vh;
  justify-content: center;
}

#enemy {
  width: 35vw;
  height: 70vh;
  justify-content: center;
}

.cards {
  width: 35vw;
  height: 60vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

/* # inputs # */

#resetContainer button {
  margin-top: -20vh;
  padding: 2vh;
  border-radius: 3px;
  width: 10vw;
  background: linear-gradient(to right, #b266b2, #bf7fbf);
}

#resetContainer button:hover {
  background: linear-gradient(to right, #b266ff, #bf7fff);
}

.card {
  width: 10vw;
  height: 40vh;
  background: linear-gradient(to bottom, #7f7fff, #9999ff);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.enemyCard {
  background: linear-gradient(to bottom, #ff7f7f, #ff9999);
}

/* # texts # */

#ally h2 {
  padding-top: 4vh;
  width: 35vw;
  height: 1vh;
  text-align: center;
}

#enemy h2 {
  padding-top: 4vh;
  width: 35vw;
  height: 1vh;
  text-align: center;
}

h1 {
  font-size: 10vh;
}

/* # animations # */

.hide {
  animation: fadeOut .25s;
  opacity: 0;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

.show {
  animation: fadeIn .25s;
  opacity: 1;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@media only screen and (max-width: 600px) {
  #resetContainer button {
    width: 50vw;
  }

  #ally h2, #enemy h2 {
    margin-bottom: 2vh;
  }
}

</style>
