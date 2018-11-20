<template>
  <div class="tempConverter" v-bind:style="{ backgroundImage: background }">
    <div class="child">
      <div class="flexChild">
        <h1>Temperature Converter</h1>

        <div class="input-container">
          <span>Celcius:</span>
          <input class="input" id="input-c" type="number" v-model="celcius" @input="inputCelc" @focusOut="looseFocus" />
        </div>

        <p id="operator">=</p>

        <div class="input-container">
          <span>Fahrenheit:</span>
          <input class="input" id="input-f" type="number" v-model="farenheit" @input="inputFare" @focusOut="looseFocus" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

function round(n) {
  return Math.round((n + 0.00001) * 10) / 10;
}

function convertToFahrenheit(celsius) {
  return round((celsius * 1.8) + 32);
}

function convertToCelsius(fahrenheit) {
  return round((fahrenheit - 32) / 1.8);
}

export default {
  name: 'tempConverter',
  data() {
    return {
      celcius: '0',
      farenheit: '0',
      background: 'linear-gradient(to bottom left, rgb(120, 120, 120), rgb(100, 100, 120))'
    }
  },
  created() {
    this.farenheit = String(convertToFahrenheit(Number(this.celcius)));
      this.background = `linear-gradient(to bottom left, rgb(${this.farenheit*2}, 0, ${140}), rgb(${this.farenheit*2}, 0, ${20}))`
  },
  methods: {
    inputCelc() {
      this.farenheit = String(convertToFahrenheit(Number(this.celcius)));
      this.background = `linear-gradient(to bottom left, rgb(${this.farenheit*2}, 0, ${140}), rgb(${this.farenheit*2}, 0, ${20}))`
    },
    inputFare() {
      this.celcius = String(convertToCelsius(Number(this.farenheit)));
      this.background = `linear-gradient(to bottom left, rgb(${this.farenheit*2}, 0, ${140}), rgb(${this.farenheit*2}, 0, ${20}))`
    },
    looseFocus() {
      if(this.farenheit == '' || this.celcius == '') {
        this.celcius = '0';
        this.farenheit = '0';
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tempConverter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
}

.child {
  width: 40vw;
  height: 60vh;
  background: white;
  border-radius: 5px;
}

.flexChild {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
}

h1 {
  text-align: center;
  font-size: 5vh;
  padding: 5vh;
}

.input-container {
  font-size: 4vh;
  text-align: center;
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

@media screen and (max-width: 600px) {
  .child {
    width: 60vw;
   height: 80vh;
  }
}
</style>
