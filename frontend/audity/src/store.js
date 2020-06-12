import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            data: null
        },
        space: {
            name: '',
            id: '2334454554325'
        },
        content: {
            name: '',
            spaceName: ''
        },
        contentyp: {
            name:''
        }
    },
    getters: {
        user(state){
            return state.user
        },
        spaceID: state => {
            return state.space.id
          },
        content(state){
            return state.content
        },
        contenttyp(state){
            return state.contentyp
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        },
        SET_SPACEID(state, idnr) {
            state.space.id = idnr;            
        },
        increment (state) {
            // mutate state
            state.space.id++
        },
        SET_CONTENT(state, createPageInfo){
            state.content.name = createPageInfo[0];
            state.content.spaceName = createPageInfo[1];
        },
        SET_CONTENTTYPNAME(state, contenttypName){
            state.contentyp.name = contenttypName
        }
    },
    actions: {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email
                });
            } else {
                commit("SET_USER", null);
            }
        },
        SET_SPACEID(context, payload) {
            setTimeout(() => {
                context.commit('SET_SPACEID', payload)
        }, 2000);
        },
        SET_CONTENT(context, payload){
            context.commit('SET_CONTENT', payload)
        },
        SET_CONTENTTYPNAME(context, payload){
            context.commit('SET_CONTENTTYPNAME', payload)
        }

    }
});