<template>
  <div class="subCipher" v-bind:style="{ backgroundImage: background }">
    <textarea id="cipherIn" @input="recieveInput" v-model="input" placeholder="encrypt"></textarea>
    <input type="file" @change="onInputFile">
    <span>=</span>
    <textarea id="cipherIn" @input="receiveOutput" v-model="output" placeholder="decrypt"></textarea>
    <input type="file" @change="onOutputFile">
  </div>
</template>

<script>


function sum(array) {
  var total = 0;
  for(var i = 0; i < array.length; i++) {
    total += Number(array[i]);
  }
  return total;
}

function average(array) {
  var length = array.length;
  var arrSum = sum(array);
  return arrSum / length;
}

function convertToASCII(string) {
  var ASCII = [];
  for(var i = 0; i < string.length; i++){
    ASCII.push(string[i].charCodeAt());
  }
  return ASCII;
}

function convertToText(stringKeys) {
  var text = [];
  for(var i = 0; i < stringKeys.length; i++){
    text.push(String.fromCharCode(stringKeys[i]));
  }
  return text.join('');
}

function moveUpChar(charKey) {
  if(charKey >= 65 && charKey <= 90) {
    var char = charKey + 13;
    return char > 90 ? char - 26 : char;
  } else if(charKey >= 97 && charKey <= 122) {
    var char = charKey + 13;
    return char > 122 ? char - 26 : char;
  } else {
    return charKey
  }
}

function moveDownChar(charKey) {
  if(charKey >= 65 && charKey <= 90) {
    var char = charKey - 13;
    return char < 65 ? char + 26 : char;
  } else if(charKey >= 97 && charKey <= 122) {
    var char = charKey - 13;
    return char < 97 ? char + 26 : char;
  } else {
    return charKey
  }
}

function encrypt(string) {
  var stringKeys = convertToASCII(string);
  for(var i = 0; i < stringKeys.length; i++) {
    stringKeys[i] = moveUpChar(stringKeys[i])
  }
  return convertToText(stringKeys);
}

function decrypt(string) {
  var stringKeys = convertToASCII(string);
  for(var i = 0; i < stringKeys.length; i++) {
    stringKeys[i] = moveDownChar(stringKeys[i])
  }
  return convertToText(stringKeys);
}

export default {
  name: 'tempConverter',
  data() {
    return {
      input: '',
      background: `linear-gradient(to bottom left, rgb(${average(convertToASCII('a'))}, 0, ${140}), rgb(${average(convertToASCII('a'))}, 0, ${20}))`,
      output: ''
    }
  },
  methods: {
    recieveInput() {
      this.background = `linear-gradient(to bottom left, rgb(${average(convertToASCII(this.input))}, 0, ${140}), rgb(${average(convertToASCII(this.input))}, 0, ${20}))`
      this.output = encrypt(this.input);
    },
    receiveOutput() {
      this.background = `linear-gradient(to bottom left, rgb(${average(convertToASCII(this.output))}, 0, ${140}), rgb(${average(convertToASCII(this.output))}, 0, ${20}))`
      this.input = decrypt(this.output);
    },
    onInputFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      const reader = new FileReader()

      var self = this;
      reader.onload = (event) => {
        self.input = event.target.result;
        self.recieveInput()
      }

      reader.onerror = error => reject(error)
      reader.readAsText(files[0]) // you could also read images and other binaries
    },
    onOutputFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      const reader = new FileReader()

      var self = this;
      reader.onload = (event) => {
        self.output = event.target.result;
        self.receiveOutput()
      }

      reader.onerror = error => reject(error)
      reader.readAsText(files[0]) // you could also read images and other binaries
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subCipher {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

span { color: white; font-size: 20vh; }

textarea {
  padding: 1vw;
  font-size: 3vh;
  height: 20vh;
}

</style>
