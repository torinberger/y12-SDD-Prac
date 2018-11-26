<template>
  <div class="hangman" v-bind:style="{ backgroundImage: background }">

  </div>
</template>

<script>

export default {
  name: 'hangman',
  data() {
    return {
      background: `linear-gradient(to bottom left, rgb(${100}, 0, ${140}), rgb(${100}, 0, ${20}))`,
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hangman {
  width: 100vw;
  height: 90vh;
}

</style>
