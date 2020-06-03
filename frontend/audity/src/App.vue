<template>
    <v-app>
		<div>
			<main class="py-4">
				<router-view></router-view>
			</main>
		</div>
	</v-app>
</template>

<script>
//import NavBar from './components/NavBar.vue'
//import Login from "./views/Login";
//import Dashboard from "./components/Dashboard";
import { mapGetters } from "vuex";

export default {
	name: 'App',
	components: {
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
