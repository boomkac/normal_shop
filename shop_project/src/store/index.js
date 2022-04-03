import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userModule = {
    namespaced: true,
    state:{
        user:null
    },
    actions:{
    },
    mutations:{
        STORE_SESSION(state, value){
            state.user = value
        }
    },
    getters:{}
}


export default new Vuex.Store({
    modules:{
        User:userModule,
    }
    
})