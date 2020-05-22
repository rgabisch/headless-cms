<template>
	<div id="app">
    
	<v-row>
		<!-- Takes component based on route -->
		<NavBar/>
		<router-view/>
    </v-row>
	
	<!-- Ende id="app" -->
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
	name: 'App',
	components: {
		NavBar
	}
}
</script>

<style>
/* Bootstrap Framework */
/* [JNR] Exchange the framework with another framework if you prefer. */
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
</style>
