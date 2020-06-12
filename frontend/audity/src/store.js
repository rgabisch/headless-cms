import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        service: {
            url: 'http://localhost:3000',
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
        spaceID: state => {
            return state.space.id
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
        SET_SPACEID(state, idnr) {
            state.space.id = idnr;
        },
        increment(state) {
            // mutate state
            state.space.id++
        },
    },
    actions: {
        SET_SPACEID(context, payload) {
            setTimeout(() => {
                context.commit('SET_SPACEID', payload)
            }, 2000);
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

            return response.data.schemas;
        },
        async openSpace({state}, name) {
            await axios.post(
                `${state.service.url}/spaces`,
                {name, userid: state.authentication.token},
                state.service.config
            );
        },
        async writeContent({state}, payload) {
            payload.creator.creatorId = state.authentication.token;

            await axios.post(
                `${state.service.url}/contents/spaces/${payload.space}`,
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
            schema.creatorId = state.authentication.token;
            await axios.post(`${state.service.url}/schemas`, schema);
        },
        async viewSchema({state}, schema) {
            const response = await axios.get(
                `${state.service.url}/schemas/${schema}`,
                state.service.config
            );
            return response.data.schema;
        },
        async viewContent({state}, {content, space}) {
            const response = await axios.get(
                `${state.service.url}/${content}/spaces/${space}`,
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
        }
    }
});