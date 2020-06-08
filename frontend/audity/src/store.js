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
        }
    },
    getters: {
        user(state){
            return state.user
        },
        spaceID: state => {
            return state.space.id
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
        }

    }
});