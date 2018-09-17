

<template>
<a class="float-right" v-on:click="sendLogout"><icon name="sign-out-alt"></icon></a>
</template>
<script>

export default {
    name: 'Logout',
    data() {
        return {
            infoMessage: '',
        }
    },
    methods: {
      sendLogout(){
        let token = localStorage.getItem('user-token') || '';

         this.axios(this.$config.API + '/auth', {
                method: "PUT",
                 headers: {'Authorization': 'Bearer ' + token,},
                 data: {
                   firstName: 'Fred',
                   lastName: 'Flintstone'
                 }
             }).then((response) => {
               console.log(response);
               if(response.data.success == 'true'){
                 this.setLogout();
                 //commit('set', {type: 'isAuth', items: true});
               }

         })
        console.log('logout');
      },
      setLogout: function(){
          this.$store.dispatch('setLogout');
      }
    }

}

</script>
