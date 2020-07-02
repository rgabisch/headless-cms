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

<style>
    .v-application .primary--text{
        color: #FF8E3C !important;
    }
    .v-btn--block .v-btn__content{
        color: white;
    }
    .v-picker--date > .v-picker__title{
        background-color: #FF8E3C !important;
    }
    .v-application .accent {
        background-color: #FF8E3C !important;
        border-color: #FF8E3C !important;
    }
    .v-application .accent--text {
        color: #FF8E3C !important;
        caret-color: #FF8E3C !important;
    }
</style>