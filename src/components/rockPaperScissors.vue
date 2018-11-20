<template>
  <div class="rockPaperScissors" v-bind:style="{ backgroundImage: background }">
    <div id="game">
        <div id="ally">
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
        <div id="vs">
            <h1>VS</h1>
        </div>
        <div id="enemy">
            <div class="card" id="enemyRock" v-bind:class="{ hide: hide.enemy.rock, show: !hide.enemy.rock }">
              <img src="../assets/rps/rock.png" alt="">
            </div>
            <div class="card" id="enemyPaper" v-bind:class="{ hide: hide.enemy.paper, show: !hide.enemy.paper }">
              <img src="../assets/rps/paper.png" alt="">
            </div>
            <div class="card" id="enemyScissors" v-bind:class="{ hide: hide.enemy.scissors, show: !hide.enemy.scissors }">
              <img src="../assets/rps/scissors.png" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>

function genRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function genEnemyChoice() {
  var enemyChoice = Math.round(genRandomNum(0, 2));
  var possibles = [
    "rock",
    "paper",
    "scissors"
  ];
  return possibles[enemyChoice];
}

function determineWinner(allyChoice, enemyChoice) {
  var lossPairs = {
    "rock": "paper",
    "paper": "scissors",
    "scissors": "rock"
  }
  var lossOfAlly = lossPairs[allyChoice];
  if(lossOfAlly == enemyChoice) {
    return false;
  } else if(allyChoice == enemyChoice) {
    return null;
  } else {
    return true;
  }
}

export default {
  name: 'tempConverter',
  data() {
    return {
      background: 'linear-gradient(to top right, rgb(120, 120, 120), rgb(100, 100, 120))',
      hide: {
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
      }
    }
  },
  methods: {
    cardSelect(allyChoice) {

      var enemyChoice = genEnemyChoice();

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

      var win = determineWinner(allyChoice, enemyChoice);

      if(win) {
        this.background = 'linear-gradient(to top right, rgb(120, 120, 120), rgb(100, 200, 120))';
      } else if(win == null) {
        this.background = 'linear-gradient(to top right, rgb(120, 120, 120), rgb(100, 100, 120))';
      } else {
        this.background = 'linear-gradient(to top right, rgb(120, 120, 120), rgb(200, 100, 120))';
      }

      setTimeout(() => {
        // hide other cards of ally
        this.hide.ally.rock = false;
        this.hide.ally.paper = false;
        this.hide.ally.scissors = false;

        // hide other cards of enemy
        this.hide.enemy.rock = false;
        this.hide.enemy.paper = false;
        this.hide.enemy.scissors = false;
      }, 1000)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  font-family: sans-serif;
}

.rockPaperScissors {
  width: 100vw;
  height: 90vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

#game {
  width: 90vw;
  height: 90vh;
  border: 1px solid black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#ally {
  width: 35vw;
  height: 60vh;
  border: 1px solid blue;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#enemy {
  width: 35vw;
  height: 60vh;
  border: 1px solid red;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.card {
  width: 10vw;
  height: 40vh;
  background: #9999ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 10vh;
}

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
</style>
