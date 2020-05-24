<template>
    <v-app>
		<!-- Takes component based on route -->
		<router-view/>
		<nav-bar/>
	</v-app>
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
body{
	max-width: 96%;
	margin-right: 2%;
	margin-left: 2%;
}
</style>
