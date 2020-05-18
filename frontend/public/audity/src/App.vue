<template>
  <div id="app" class="container col-xs-12 col-sm-12 col-md-offset-3 col-md-5 col-lg-offset-3 col-lg-5">
    <div>
      <h2>Audity</h2>
      <p>Die Plattform für Content-Creator!</p>
    </div>
    <ul class="nav navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around" id="navbar-audity">
      <li class="nav-item"><router-link class="nav-link" to="/spaces">Spaces</router-link></li> 
      <li class="nav-item"><router-link class="nav-link" to="/seiten">Seiten</router-link></li> 
      <!-- Add more Navbar-Links -->
    </ul>

    <!-- Takes component based on route -->
    <router-view></router-view>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
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
#navbar-audity{
  margin-bottom: 40px;
}
</style>
