<template>
  <!-- containing div of component w/dynamic background -->
  <div class="tempConverter" v-bind:style="{ backgroundImage: background }">
    <!-- container that contains all elements and has white background -->
    <div class="content-container">
      <!-- flexbox child for auto-centering -->
      <div class="flex-child">
        <h1>Temperature Converter</h1>

        <!-- auto-centering input container -->
        <div class="input-container">
          <span>Celcius:</span>
          <input class="input" id="input-c" type="number" v-model="celcius" @input="inputCelc" @focusOut="looseFocus" />
          <!--
            @id input-c
            @type number
            @vue-model celcius // reflects vue variable
            @on-input inputCelc // calculate temperature and reflect it on farenheit input
            @on-loose-focuss looseFocus // used to set inputs to 0 if empty
          -->
        </div>

        <!-- equals operator for good looks -->
        <p id="operator">=</p>

        <!-- auto-centering input container -->
        <div class="input-container">
          <span>Fahrenheit:</span>
          <input class="input" id="input-f" type="number" v-model="farenheit" @input="inputFare" @focusOut="looseFocus" />
          <!--
            @id input-f
            @type number
            @vue-model farenheit // reflects vue variable
            @on-input inputFare // calculate temperature and reflect it on celcius input
            @on-loose-focuss looseFocus // used to set inputs to 0 if empty
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// used to round outputs to 1 dp
function round(n) {
  return Math.round((n + 0.00001) * 10) / 10;
}

// converts celcius input to farenheit output
function convertToFahrenheit(celsius) {
  return round((celsius * 1.8) + 32);
}

// converts farenheit input to celcius output
function convertToCelsius(fahrenheit) {
  return round((fahrenheit - 32) / 1.8);
}

// vue instance
export default {
  name: 'tempConverter',
  data() {
    return { // set vue variables
      celcius: '0',
      farenheit: '0',
      background: 'linear-gradient(to bottom left, rgb(120, 120, 120), rgb(100, 100, 120))' // rgb dynamic background to reflect temp
    }
  },
  created() {
    // calculate farenheight from 0 celcius
    this.farenheit = String(convertToFahrenheit(Number(this.celcius)));
    // dynamicly update background to match temp
    this.background = `linear-gradient(to bottom left, rgb(${this.farenheit*2}, 0, ${140}), rgb(${this.farenheit*2}, 0, ${20}))`
  },
  methods: {
    inputCelc() { // on celcius input
      // calculate farenheit from input celcius
      this.farenheit = String(convertToFahrenheit(Number(this.celcius)));
      // dynamicly update background to match temp
      this.background = `linear-gradient(to bottom left, rgb(${this.farenheit*2}, 0, ${140}), rgb(${this.farenheit*2}, 0, ${20}))`
    },
    inputFare() { // on farenheit input
      // calculate celcius from input farenheit
      this.celcius = String(convertToCelsius(Number(this.farenheit)));
      // dynamicly update background to match temp
      this.background = `linear-gradient(to bottom left, rgb(${this.farenheit*2}, 0, ${140}), rgb(${this.farenheit*2}, 0, ${20}))`
    },
    looseFocus() { // when one of inputs are deselected
      if(this.farenheit == '' || this.celcius == '') { // check if either input is empty
        this.celcius = '0'; // if so reset inputs
        this.farenheit = '0';
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* # containers # */

.tempConverter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
}

.content-container {
  width: 40vw;
  height: 60vh;
  background: white;
  border-radius: 5px;
}

.flex-child {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
}

.input-container {
  font-size: 4vh;
  text-align: center;
}

/* # text # */

h1 {
  text-align: center;
  font-size: 5vh;
  padding: 5vh;
}

span {
  width: 50%;
}

input {
  font-size: 4vh;
  width: 20%;
  background: transparent;
  border-bottom: 1px solid black;
}

#operator {
  text-align: center;
  font-size: 4vh;
}

@media only screen and (max-width: 800px) {
  .content-container {
    width: 80vw;
  }
}

</style>
