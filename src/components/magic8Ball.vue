<template>
  <div class="magic8Ball" v-bind:style="{ backgroundImage: background }">
    <div id="ball" @click="callBall">
      <div id="viewHole">
          <div id="resultHole">
              <div id="triangle">
                  <p id="result" v-if="doFade" v-bind:class="{ fadeInClass: doFade }">{{ result }}</p>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

function round(n) {
  return Math.round((n + 0.00001) * 10) / 10;
}

function genRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

var potentialResults = [
  "Not looking good...",
  "Looking good!",
  "Fate uncertain...",
  "You are destined!",
  "You should be scared...",
  "Life is meaningless...",
  "I'm busy...",
  "Dont ask a ball!"
]

export default {
  name: 'magic8Ball',
  data() {
    return {
     mood: 1,
     background: 'linear-gradient(to top right, rgb(120, 120, 120), rgb(100, 100, 120))',
     result: 'Click Me!',
     doFade: true
    }
  },
  created() {
    this.background = `linear-gradient(to bottom left, rgb(${this.mood*40}, 0, ${140}), rgb(${(this.mood*20)/2}, 0, ${20}))`
  },
  methods: {
    callBall() {
      this.doFade = false;
      var randomNum =  Math.round(genRandomNum(0, potentialResults.length));
      var toDisplay = potentialResults[randomNum];
      this.mood = randomNum;
      this.background = `linear-gradient(to bottom left, rgb(${this.mood*30}, 0, ${140}), rgb(${(this.mood*30)/2}, 0, ${20}))`
      this.result = toDisplay;
      var self = this;
      setTimeout(function() {
        self.doFade = true;
      }, 1)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
  border: 0;
}

.magic8Ball {
  width: 100vw;
  height: 90vh;
  padding: 0;
  margin: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#ball {
  width: 80vh;
  height: 80vh;
  background: radial-gradient(#282828, black);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#viewHole {
  width: 35vh;
  height: 35vh;
  background: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #3d3d3d;
}

#resultHole {
  width: 30vh;
  height: 30vh;
  background: black;
  border-radius: 50%;
  border: 3px solid #3d3d3d;
  display: flex;
  align-items: center;
  justify-content: center;
}
#result {
  color: white;
  width: 12vh;
  text-align: center;
  font-family: sans-serif;
  margin-top: -3vh;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.fadeInClass {
  animation: fadeIn 2s;
}

#triangle {
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  background: #2980b9;
  width: 25vh;
  height: 20vh;
  margin-top: 6vh;
}

</style>
