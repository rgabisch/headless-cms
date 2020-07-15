<template>
    <v-app>
        <NavBar/>
        <CoreView/>
    </v-app>
</template>

<script>
    import CoreView from "../components/CoreView";
    import NavBar from "../components/NavBar";

    export default {
        name: "Core",
        components: {CoreView, NavBar},
    }
</script>

<style scoped>

</style>