<template>
	<div id="app">
		<!-- Takes component based on route -->
		<router-view/>
	</div>
</template>

<script>

export default {
	name: 'App',
}
</script>

<style>
/* Bootstrap Framework */
/* [JNR] Exchange the framework with another framework if you prefer. */
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
</style>
