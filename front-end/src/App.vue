<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
}
#app {
  font-family: "Prompt", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/bg.jpg");
  background-size: 100% 100%;
}
</style>
