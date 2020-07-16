<template>
    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
                <button
                        class="menubar__button pa-0"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                >
                    <v-icon large name="bold">mdi-alpha-b</v-icon>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                >
                    <v-icon name="italic">mdi-format-italic</v-icon>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                >
                    <v-icon name="underline">mdi-format-underline</v-icon>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.code() }"
                        @click="commands.code"
                >
                    <v-icon name="code">mdi-code-tags</v-icon>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                >
                    <strong>H1</strong>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                >
                    <strong>H2</strong>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                >
                    <strong>H3</strong>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                >
                    <v-icon name="ul">mdi-format-list-bulleted</v-icon>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                >
                    <v-icon name="ol">mdi-format-list-numbered</v-icon>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                >
                    <v-icon name="quote">mdi-format-quote-open</v-icon>
                </button>

                <button
                        class="menubar__button"
                        @click="commands.undo"
                >
                    <v-icon name="undo">mdi-undo</v-icon>
                </button>

                <button
                        class="menubar__button"
                        @click="commands.redo"
                >
                    <v-icon name="redo">mdi-redo</v-icon>
                </button>
            </div>
        </editor-menu-bar>
        <editor-content class="editor__content mb-7" :editor="editor"></editor-content>
    </div>
</template>

<script>
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
    import {
        Blockquote,
        Heading,
        OrderedList,
        BulletList,
        ListItem,
        Bold,
        Code,
        Italic,
        Underline,
        History,
    } from 'tiptap-extensions'

    export default {
        name: "RichTextEditor",
        components: {
            EditorContent,
            EditorMenuBar,
        },
        props: [ 'value' ],
        data: () => ({
        editor: null
        }),
        mounted() {
            this.editor = new Editor({
                extensions: [new Blockquote(),
                    new BulletList(),
                    new Heading({ levels: [1, 2, 3] }),
                    new ListItem(),
                    new OrderedList(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Underline(),
                    new History(), ],
                content: this.value,
                onUpdate: ({ getHTML }) => {
                    this.$emit('input', getHTML())
                },
            })
            this.editor.setContent(this.value)
        },
        beforeDestroy() {
            if (this.editor) {
                this.editor.destroy()
            }
        },
        watch: {
            value (val) {
                if (this.editor && val !== this.value) {
                    this.editor.setContent(val, true)
                }
            },

        }
    }
</script>

<style scoped>
    pre {
        padding: 1rem;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        background: black;
        color: black;
    }
    code {
        display: block;
        white-space: pre-wrap;
    }
    .editor__content{
        border: 1px solid black;
        border-radius: 5px;
        min-height: 300px;
        text-align: left;

    }
    .menubar__button{
        color: #757575;
        padding: 2%;
    }
</style>