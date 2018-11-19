<template>
  <div id="app">
    <div id="navbar">

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: sans-serif;
    font-weight: 200;
  }
  #app {
    width: 100vw;
    height: 100vh;
  }

  #navbar {
    width: 100vw;
    height: 10vh;
    background: #302f30;
  }
</style>
