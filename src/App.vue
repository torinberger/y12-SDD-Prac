<template>
  <div id="app">
    <div id="navbar">

      <router-link to="/">
      <img src="./assets/temp.png"></router-link>

      <router-link to="/magic8Ball">
      <img src="./assets/8ball.png" alt=""></router-link>

      <router-link to="/rockPaperScissors">
      <img src="./assets/rock.png" alt=""></router-link>

      <router-link to="/subCipher">
      <img src="./assets/locked.png" alt=""></router-link>

    </div>

    <transition name="router-anim">
      <router-view/>
    </transition>

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
  body {
    background: black;
    overflow: hidden;
  }

  #navbar {
    width: 100vw;
    height: 10vh;
    background: #302f30;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  #navbar img {
    width: 8vh;
    height: 8vh;
    -webkit-filter: invert(50%);
    filter: invert(50%);
  }

  #navbar img:hover {
    -webkit-filter: invert(95%);
    filter: invert(95%);
    transition: 0.3s;
  }

  a {outline : none;}

  .router-link-exact-active img {
    -webkit-filter: invert(75%) !important;
    filter: invert(75%) !important;
  }

  .router-anim-enter-active {
    animation: coming 0.5s;
    animation-delay: 0.5s;
    opacity: 0;
  }
  .router-anim-leave-active {
    animation: going 0.5s;
  }

  @keyframes going {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50vw);
      opacity: 0;
    }
  }
  @keyframes coming {
    from {
      transform: translateX(50vw);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

</style>
