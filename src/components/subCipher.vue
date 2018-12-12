<template>
  <!-- containing div of component w/dynamic background -->
  <div class="subCipher" v-bind:style="{ backgroundImage: background }">
    <!-- input container -->
    <div class="container">
      <textarea @input="encryptInput" v-model="input" placeholder="encrypt"></textarea>
      <!--
        @type textarea
        @vue-model input // reflects vue variable
      -->
      <div class="buttons">
        <!-- download and upload inputs -->
        <input type="file" @change="decryptedDataUpload">
        <button @click="decryptedDataDownload">Download</button>
      </div>

    </div>

    <!-- equals sign for prettyness -->
    <span>=</span>

    <!-- input container -->
    <div class="container">
      <textarea @input="decryptInput" v-model="output" placeholder="decrypt"></textarea>
      <!--
        @type textarea
        @vue-model output // reflects vue variable
      -->
      <div class="buttons">
        <!-- download and upload inputs -->
        <input type="file" @change="encryptedDataUpload" value="upload file">
        <button @click="encryptedDataDownload">Download</button>
      </div>

    </div>
  </div>
</template>

<script>

// sum up the value of an arry of integers
function sum(array) {
  var total = 0;
  for(var i = 0; i < array.length; i++) {
    total += Number(array[i]);
  }
  return total;
}

// find the average item of an integer array
function average(array) {
  var length = array.length;
  var arrSum = sum(array);
  return arrSum / length;
}

// convert a character to an ASCII integer
function convertToASCII(string) {
  var ASCII = [];
  for(var i = 0; i < string.length; i++){
    ASCII.push(string[i].charCodeAt());
  }
  return ASCII;
}

// convert an integer to an ASCII character
function convertToText(stringKeys) {
  var text = [];
  for(var i = 0; i < stringKeys.length; i++){
    text.push(String.fromCharCode(stringKeys[i]));
  }
  return text.join('');
}

// move a integer ascii value up by 13
function moveUpChar(charKey) {
  if(charKey >= 65 && charKey <= 90) { // check if char uppercase
    // super spesh formula
    var char = charKey + 13; // adds 13
    return char > 90 ? char - 26 : char;  // if over limit, bring back into limit
  } else if(charKey >= 97 && charKey <= 122) { // check that char lowercase
    // super spesh formula
    var char = charKey + 13; // adds 13
    return char > 122 ? char - 26 : char; // if over limit, bring back into limit
  } else { // if not alphabetical, ignore
    return charKey;
  }
}

// move a integer ascii value down by 13
function moveDownChar(charKey) {
  if(charKey >= 65 && charKey <= 90) { // check that char is uppercase
    // super spesh formula
    var char = charKey - 13; // reduce by 13
    return char < 65 ? char + 26 : char; // if under limit, bring back into limit
  } else if(charKey >= 97 && charKey <= 122) { // check that char is lowercase
    // super spesh formula
    var char = charKey - 13; // reduce by 13
    return char < 97 ? char + 26 : char; // if under limit, bring back into limit
  } else { // if char not alphabetical, ignore
    return charKey
  }
}

// encrypt a given string
function encrypt(string) {
  var stringKeys = convertToASCII(string); // convert the string to integers
  for(var i = 0; i < stringKeys.length; i++) {
    stringKeys[i] = moveUpChar(stringKeys[i]); // manually encrypt each char
  }
  return convertToText(stringKeys); // convert integer chars back to string
}

// decrypt a given string
function decrypt(string) {
  var stringKeys = convertToASCII(string); // convert the string to integers
  for(var i = 0; i < stringKeys.length; i++) {
    stringKeys[i] = moveDownChar(stringKeys[i]); // manually decrypt each char
  }
  return convertToText(stringKeys); // convert integer chars back to string
}

// download specified text as specified filename
function download(filename, text) {
  var element = document.createElement('a'); // create a fake a[href]
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)); // set download to specified text
  element.setAttribute('download', filename); // set download filename

  element.style.display = 'none'; // hide fake a[href]
  document.body.appendChild(element); // add to body

  element.click(); // click download link automatically

  document.body.removeChild(element); // remove fake a[href]
}

export default {
  name: 'tempConverter',
  data() {
    return { // create vue variables
      input: '',
      output: '',
      background: `linear-gradient(to bottom left, rgb(${average(convertToASCII('a'))}, 0, ${140}), rgb(${average(convertToASCII('a'))}, 0, ${20}))` // create dynamic background
    }
  },
  methods: {
    encryptInput() { // when un-encrypted input recieved
      // update dynamic background
      this.background = `linear-gradient(to bottom left, rgb(${average(convertToASCII(this.input))}, 0, ${140}), rgb(${average(convertToASCII(this.input))}, 0, ${20}))`
      this.output = encrypt(this.input); // encrypt data and display
    },
    decryptInput() { // when encrypt input recieved
      // update dynamic background
      this.background = `linear-gradient(to bottom left, rgb(${average(convertToASCII(this.output))}, 0, ${140}), rgb(${average(convertToASCII(this.output))}, 0, ${20}))`
      this.input = decrypt(this.output); // decrypt data and display
    },
    decryptedDataUpload(e) { // when text file uploaded and needs to be encrypted
      var files = e.target.files || e.dataTransfer.files; // get files
      const reader = new FileReader() // create file reader

      var self = this; // store vue instance
      reader.onload = (event) => { // when file read
        self.input = event.target.result; // set input
        self.encryptInput() // encrypt input
      }

      reader.onerror = error => reject(error) // if error, handle it
      reader.readAsText(files[0]); // begin reading
    },
    encryptedDataUpload(e) {
      var files = e.target.files || e.dataTransfer.files; // get files
      const reader = new FileReader() // create file reader

      var self = this; // store vue instance
      reader.onload = (event) => { // when file read
        self.output = event.target.result; // set output
        self.decryptInput() // encrypt input
      }

      reader.onerror = error => reject(error) // if error, handle it
      reader.readAsText(files[0]) // begin reading
    },
    encryptedDataDownload() { // if encrypted data needs to be downloaded
      download('encrypted.txt', this.output); // download it
    },
    decryptedDataDownload() { // if decrypted data needs to be downloaded
      download('decrypted.txt', this.input); // download it
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* # containers # */

.subCipher {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  margin-top: -5vh;
}

.buttons {
  display: flex;
}

/* # text # */

span { color: white; font-size: 20vh; margin-top: -12.5vh;}

textarea {
  padding: 1vw;
  font-size: 3vh;
  height: 20vh;
}

.buttons span {
  font-size: 2vh;
  margin: 1vw;
  margin-top: 1.5vw;
  margin-right: 0;
}

button {
  height: 5vh;
  width: 5vw;
  background: white;
  border: 0;
  border-radius: 0;
  margin: 1vw;
}

input[type="file"] {
  margin-top: 1.5vw;
  color: white;
}

</style>
