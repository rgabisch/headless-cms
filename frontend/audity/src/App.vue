<template>
    <v-app>
		<!-- Takes component based on route -->
		<router-view v-if ="user"></router-view>
		<Login v-else></Login>
		<nav-bar v-if="user"></nav-bar>
	</v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { mapGetters } from "vuex";

export default {
	name: 'App',
	components: {
		NavBar
	},
	computed: {
		// map `this.user` to `this.$store.getters.user`
		...mapGetters({
			user: "user"
		})
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
