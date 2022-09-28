import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    height: window.innerHeight,
    width: window.innerWidth,
    user: null,
    login: false,
    param: {
        flyPlace: '',
        toPlace: '',
        time:''
    }
}
const actions = {
    logout(content) {
        content.commit('LOGOUT')
    },
    setUser(content, value) {
        content.commit('SETUSER', value)
    },
    setLogin(content, value) {
        content.commit('SETLOGIN', value)
    },
    setParam(content, value){
        content.commit('SETPARAM',value)
    }
}

const mutations = {
    SIZE(state, value) {
        state.height = value[0]
        state.width = value[1]
    },
    LOGOUT(state) {
        state.user = null
        console.log(state)
    },
    SETUSER(state, value) {
        state.user = value
    },
    SETLOGIN(state, value) {
        state.login = value
    },
    SETPARAM(state,value){
        state.param = value
    }
}

const getters = {
    getHeight(state) {
        return state.height
    },
    getWidth(state) {
        return state.width
    },
    getUser(state) {
        return state.user
    },
    getLogin(state) {
        return state.login
    },
    getParam(state){
        return state.param
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})