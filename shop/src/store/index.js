import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//const vueConfig = require('vue-config')
const vuexConfigs = {
  API: 'http://new-rest.test' // It's better to require a config file
}



export default  new Vuex.Store({
  state:{
    booksList:[],
    isAuth: false,
    cartItems: 0,
    isAdmin: false,
  },
  getters: {
   booksList(state) {
     let booksList = state.booksList

     return booksList;
   }
 },
  mutations:{
    set(state, { type, items }) {
      state[type] = items
    },

  },
  actions: {
    getAllBooks({ commit }) {

      fetch(vuexConfigs.API + '/books').then(function(response) {
           return response.json();
       }).then((response) => {
           let booksList = response;
           commit('set', { type: 'booksList', items: booksList })
       });
    },

    getBooksByAuthor({commit}, id){
      fetch(vuexConfigs.API + '/books?author='+id).then(function(response) {
           return response.json();
       }).then((response) => {
           let booksList = response;
           commit('set', { type: 'booksList', items: booksList })
       });
    },

    getBooksByGenre({commit}, id){
      fetch(vuexConfigs.API + '/books?genre='+id).then(function(response) {
           return response.json();
       }).then((response) => {
           let booksList = response;
           commit('set', { type: 'booksList', items: booksList })
       });
    },

    checkAuth({commit}){
     let token = localStorage.getItem('user-token') || '';

      Vue.axios.get(vuexConfigs.API + '/auth', {
              headers: {'Authorization': 'Bearer ' + token,}
          }).then((response) => {
            console.log(response);
            if(response.data.success && response.data.success == 'true'){

              if(response.data.admin == true){

                  commit('set', {type: 'isAdmin', items: true});
              }

                commit('set', {type: 'isAuth', items: true});
            }

      })
    },

    setAuth({commit}){
      commit('set' ,{type: 'isAuth', items: true});
    },

    setLogout({commit}){
      commit('set' ,{type: 'isAuth', items: false});
      commit('set' ,{type: 'isAdmin', items: false});
    },
    setEmptyCounters({commit}){
      commit('set', {type: 'cartItems', items:0})
    },
    addCountCartItems({commit}){

      let token = localStorage.getItem('user-token') || '';
      console.log('add cart');
       Vue.axios.get(vuexConfigs.API + '/cart', {
               headers: {'Authorization': 'Bearer ' + token,}
           }).then((response) => {
             if(response.data.cartItems){
               let count =  response.data.cartItems.length;

               commit('set', {type: 'cartItems', items: count});
             }

       })

    },
    subCountCartItems({commit}){
      let token = localStorage.getItem('user-token') || '';
      console.log('add cart');
       Vue.axios.get(vuexConfigs.API + '/cart', {
               headers: {'Authorization': 'Bearer ' + token,}
           }).then((response) => {
           let count =  response.data.cartItems.length;


               commit('set', {type: 'cartItems', items: count});


       })
    }
  }

})

//export default store
