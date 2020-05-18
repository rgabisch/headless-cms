<template>
  <div id="app" class="container col-xs-12 col-sm-12 col-md-offset-3 col-md-5 col-lg-offset-3 col-lg-5">
    <div>
      <h2>Spaces</h2>
      <p>Eine Übersicht deiner Spaces</p>
    </div>
    <Space />
  </div>
</template>

<script>
import Space from './components/Space.vue'


export default {
  name: 'App',
  components: {
    Space
  }
}
</script>

<style>

/* Bootstrap Framework */
/* [JNR] Exchange the framework with another framework if you prefer. */

@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
