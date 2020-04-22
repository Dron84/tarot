<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Индивидуальный</router-link> |
      <router-link to="/duble">Парный</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">
  @import "sass/vars"
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: $fore


  #nav
    padding: 30px
    a
      font-weight: bold
      color: $fore
      text-decoration: none
      &.router-link-exact-active
        color: $five
        text-decoration: underline
</style>
