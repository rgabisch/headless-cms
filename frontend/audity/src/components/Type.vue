<template>
    <!-- Text Type -->
    <div v-if="id === '1'">
        <v-card>
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-text-field
                    placeholder=""
                    outlined
                    v-model="test"
            ></v-text-field>
        </v-card>
    </div>
    <!-- Audio Type -->
    <div v-else-if="id === '6'">
        <v-card>
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-btn><label for="upload-audio">Search</label></v-btn>
            <input type="file" name="audio" id="upload-audio" />

        </v-card>
    </div>
    <!-- Date Type -->
    <div v-else-if="id === '4'">
        <v-card>
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-date-picker
                    v-model="datePicker"
                    :show-current=true
                    :landscape=true
            ></v-date-picker>
        </v-card>

    </div>
    <div v-else>
        Not yet implemented {{label}}
    </div>
</template>
<script>
    export default {
        name: 'Type',
        props: ['id', 'label'],
        data: () => ({
            datePicker: new Date().toISOString().substr(0, 10),
            rules: {
                required: [value => !!value || "Required"]
            },
            test: ''
        }),
        watch: {
            test: {
                handler: function() {
                    this.$emit('newdata', this.test);
                },
                deep: true
            }
        }
    }
</script>

<style>
    .draggable-item{
        cursor: grab;
    }
    label {
        cursor: pointer;
    }

    #upload-audio{
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
</style>