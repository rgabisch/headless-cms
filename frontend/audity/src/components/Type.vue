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
            <rich-text-editor v-model="input"></rich-text-editor>
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
            <v-img v-if="preview" :src="preview" class="uploading-image"></v-img>
            <v-btn><label for="upload-image">Durchsuchen</label></v-btn>
            <input type="file" accept="image/*" name="image" id="upload-image" />
        </div>
        <!-- Audio -->
        <div v-else-if="id === '6'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <div><audio v-if="preview" controls :src="preview"></audio></div>
            <v-btn><label for="upload-audio">Durchsuchen</label></v-btn>
            <input type="file" accept="audio/*" name="audio" id="upload-audio" @change="onFileUpload"/>
            {{fileName}}
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
        props: ['id', 'label', 'value'],
        components: {RichTextEditor},
        data: () => ({
            preview: null,
            fileName: '',
            rules: {
                number: [value => !!Number(value) || "The input must be a number"]
            }
        }),
        methods: {
            getEditorData: function (e) {
                this.input = e;
            },
            onFileUpload (event) {
                const file = event.target.files[0];
                this.preview = URL.createObjectURL(file);
                console.log(event.target.files[0])
                this.input = event.target.files[0]

            },
        },
        computed: {
            input: {
                get: function() {
                    return this.value;
                },
                set: function (newValue) {
                    this.$emit('update:value', newValue)
                }
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