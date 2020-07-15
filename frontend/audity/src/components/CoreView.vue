<template>
    <v-content class="ml-4">
        <router-view/>
    </v-content>
</template>

<script>
    export default {
        name: "CoreView"
    }
</script>

<style>
    .v-content {
        background: #E5E5E5;;
    }
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