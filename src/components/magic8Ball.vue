<template>
  <!-- containing div of component w/dynamic background -->
  <div class="magic8Ball" v-bind:style="{ backgroundImage: background }">
    <!-- magic 8 ball w/ click event -->
    <div id="ball" @click="callBall">
      <!-- css divs for looks -->
      <div id="viewHole">
        <div id="resultHole">
          <div id="triangle">
            <!-- result container w/animation -->
            <p id="result" v-if="doFade" v-bind:class="{ fadeInClass: doFade }">{{ result }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// generate random number in range
function genRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

// array containing all potential results
var potentialResults = [
  "Not looking good...",
  "Looking good!",
  "Fate uncertain...",
  "You are destined!",
  "You should be scared...",
  "Life is meaningless...",
  "I'm busy...",
  "Dont ask a ball!",
  "Yes!",
  "No!",
  "Maybe..."
]

export default { // vue instance
  name: 'magic8Ball',
  data() {
    return { // vue variables
      mood: 1, // mood to change background
      background: 'linear-gradient(to top right, rgb(120, 120, 120), rgb(100, 100, 120))', // dynamic background
      result: 'Click Me!',
      doFade: true
    }
  },
  created() { // dynamicly update background when created
    this.background = `linear-gradient(to bottom left, rgb(${this.mood*40}, 0, ${140}), rgb(${(this.mood*20)/2}, 0, ${20}))`
  },
  methods: {
    callBall() { // when magic8ball clicked
      this.doFade = false; // stop fade
      // generate random message
      var randomNum =  Math.round(genRandomNum(0, potentialResults.length-1));
      var toDisplay = potentialResults[randomNum];

      // update mood/background
      this.mood = randomNum;
      this.background = `linear-gradient(to bottom left, rgb(${this.mood*30}, 0, ${140}), rgb(${(this.mood*30)/2}, 0, ${20}))`

      this.result = toDisplay; // display result

      var self = this; // store vue instance
      setTimeout(function() { // wait 1ms (idk why tho, ask 1:00am me)
        self.doFade = true; // fade in
      }, 1)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* # containers # */

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

/* # super cool css to make ball look good # */

#ball {
  width: 40vw;
  height: 40vw;
  background: radial-gradient(#282828, black);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#viewHole {
  width: 17vw;
  height: 17vw;
  background: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #3d3d3d;
}

#resultHole {
  width: 15vw;
  height: 15vw;
  background: black;
  border-radius: 50%;
  border: 3px solid #3d3d3d;
  display: flex;
  align-items: center;
  justify-content: center;
}

#triangle {
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  background: #2980b9;
  width: 13vw;
  height: 9vw;
  margin-top: 6vh;
}

/* # text # */

#result {
  color: white;
  width: 12vh;
  text-align: center;
  font-family: sans-serif;
  margin-top: -3vh;
}

/* # animation # */

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.fadeInClass {
  animation: fadeIn 2s;
}

@media only screen and (max-width: 600px) {
  #ball {
    width: 80vw;
    height: 80vw;
  }

  #viewHole {
    width: 36vw;
    height: 36vw;
  }

  #resultHole {
    width: 30vw;
    height: 30vw;
  }

  #triangle {
    width: 26vw;
    height: 18vw;
    margin-top: 3vh;
    font-size: 1.5vh;
  }
}

</style>
