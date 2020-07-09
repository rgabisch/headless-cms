<template>
    <v-card class="pb-3">
        <!-- Text  -->
        <div v-if="id === '1'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-text-field
                    placeholder=""
                    outlined
                    v-model="input"
            ></v-text-field>
        </div>
        <!-- Rich Text -->
        <div v-else-if="id === '2'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <rich-text-editor @contentHtml="getEditorData($event)"></rich-text-editor>
        </div>
        <!-- Number -->
        <div v-else-if="id === '3'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-text-field
                    placeholder=""
                    outlined
                    type="number"
                    v-model="input"
                    :rules="rules.number"
            ></v-text-field>
        </div>
        <!-- Date -->
        <div v-else-if="id === '4'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-date-picker
                    v-model="input"
                    :show-current=true
                    :landscape=true
            ></v-date-picker>
        </div>
        <!-- Image -->
        <div v-else-if="id === '5'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-btn><label for="upload-image">Durchsuchen</label></v-btn>
            <input type="file" accept="image/*" name="image" id="upload-image" />
        </div>
        <!-- Audio -->
        <div v-else-if="id === '6'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-btn><label for="upload-audio">Durchsuchen</label></v-btn>
            <input type="file" accept="audio/*" name="audio" id="upload-audio" @change="onFileUpload"/>
        </div>
        <div v-else>
            Type '{{label}}' with id {{id}} doesn#t exists.
        </div>
    </v-card>
</template>
<script>
    import RichTextEditor from './RichTextEditor.vue'
    export default {
        name: 'Type',
        props: ['id', 'label'],
        components: {RichTextEditor},
        data: () => ({
            input: '',
            rules: {
                number: [value => !!Number(value) || "The input must be a number"]
            }
        }),
        methods: {
            getEditorData: function (e) {
                this.input = e;
            },
            onFileUpload (event) {
                this.input = event.target.files[0]

            },
        },
        watch: {
            input: {
                handler: function() {
                    this.$emit('input', this.input);
                },
                deep: true
            }
        }
    }
</script>

<style>
    label {
        cursor: pointer;
    }

    #upload-audio, #upload-image{
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
</style>