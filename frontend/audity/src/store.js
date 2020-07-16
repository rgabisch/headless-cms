import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        service: {
            url: '/api',
            config: {
                headers: {
                    Authorization: undefined
                }
            }
        },
        authentication: {
            isLoggedIn: false,
            token: undefined
        },
        user: {
            email: undefined
        },
        space: {
            name: '',
            id: '2334454554325'
        },
        content: {
            name: '',
            inSpace: ''
        },
        schema: {
            name: ''
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.authentication.isLoggedIn;
        },
        token(state) {
            return state.authentication.token
        },
        usersEmail(state) {
            return state.user.email
        },
        space: state => {
            return state.space
        },
        content(state) {
            return state.content
        },
        schema(state) {
            return state.schema
        }
    },
    mutations: {
        setToken(state, token) {
            state.authentication.token = token;
            state.service.config.headers.Authorization = token;
        },
        setLoggedIn(state, value) {
            state.authentication.isLoggedIn = value;
        },
        setUserEmail(state, email) {
            state.user.email = email;
            console.log(`SET_USER_EMAIL: ${email}`)
        },
        SET_SPACE(state, space) {
            state.space.id = space.id;
            state.space.name = space.name;
        },
        increment(state) {
            // mutate state
            state.space.id++
        },
        SET_CONTENT(state, createPageInfo) {
            state.content.name = createPageInfo[0];
            state.content.inSpace = createPageInfo[1];
        },
        SET_SCHEMA(state, schemaName) {
            state.schema.name = schemaName
        }
    },
    actions: {
        SET_SPACE(context, payload) {
            setTimeout(() => {
                context.commit('SET_SPACE', payload)
            }, 2000);
        },
        SET_CONTENT(context, payload) {
            context.commit('SET_CONTENT', payload)
        },
        SET_SCHEMA(context, payload) {
            context.commit('SET_SCHEMA', payload)
        },
        async listAllSpaces({state}) {
            const response = await axios.get(
                `${state.service.url}/spaces`,
                state.service.config
            );

            return response.data;
        },
        async listAllSchemas({state}) {
            const response = await axios.get(
                `${state.service.url}/schemas`,
                state.service.config
            );

            return response.data;
        },
        async listAllContents({state}) {
            const response = await axios.get(
                `${state.service.url}/contents`,
                state.service.config
            );

            return response.data;
        },
        async openSpace({state}, name) {
            await axios.post(
                `${state.service.url}/spaces`, {name},
                state.service.config
            );
        },
        async writeContent({state}, payload) {
            await axios.post(
                `${state.service.url}/contents/spaces/${payload.space}`,
                payload.content,
                state.service.config
            )
        },
        async editContent({state}, payload) {
            await axios.put(
                `${state.service.url}/contents/${payload.contentId}/spaces/${payload.spaceId}`,
                payload.content,
                state.service.config
            )
        },
        async viewSpace({state}, space) {
            const response = await axios.get(
                `${state.service.url}/contents/spaces/${space}`,
                state.service.config
            );
            return response.data;
        },
        async defineSchema({state}, schema) {
            await axios.post(
                `${state.service.url}/schemas`, schema,
                state.service.config
            );
        },
        async viewSchema({state}, schema) {
            const response = await axios.get(
                `${state.service.url}/schemas/${schema}`,
                state.service.config
            );
            return response.data;
        },
        async viewContent({state}, {content, space}) {
            const response = await axios.get(
                `${state.service.url}/contents/${content}/spaces/${space}`,
                state.service.config
            );
            return response.data;
        },
        async removeContent({state}, {content, space}) {
            const response = await axios.delete(
                `${state.service.url}/contents/${content}/spaces/${space}`,
                state.service.config
            );
            return response.data;
        },
        async login({state, commit}, {email, password}) {
            const response = await axios.post(
                `${state.service.url}/signin`,
                {
                    email,
                    password
                },
                state.service.config);

            const token = response.data.Authorization;
            commit("setToken", token);
            commit("setLoggedIn", true);
            commit("setUserEmail", email);
        },

        async signUp({state, commit}, {email, password}) {

            console.log(state.service.url)
            const response = await axios.post(
                `${state.service.url}/signup`,
                {
                    email,
                    password
                },
                state.service.config);

            const token = response.data.Authorization;
            commit("setToken", token);
            commit("setLoggedIn", true);
            commit("setUserEmail", email);
        }
    },
    plugins: [createPersistedState()]
});