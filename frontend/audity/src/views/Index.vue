<template>
    <v-app>
        <NavBar/>
        <CoreView/>
    </v-app>
</template>

<script>
    import NavBar from "../components/NavBar";
    import CoreView from "../components/CoreView";
    export default {
        name: "Index",
        components: {CoreView, NavBar}
    }
</script>

<style scoped>

</style>