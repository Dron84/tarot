<template>
  <div id="app">
    <div id="nav">
      <router-link class="nav-link" :to="link.path" v-for="link in links" :key="link.path">{{link.title}}</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
      data:()=>({
          links: [],
      }),
      created(){
          this.links = this.$router.options.routes
      }
  }
</script>
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
      position: relative
      margin: 0 30px 0 0
      &.router-link-exact-active
        color: $five
        text-decoration: underline
      &::after
        content: "|"
        position: absolute
        top: 0
        right: -15px

</style>
