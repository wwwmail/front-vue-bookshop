<style>



</style>

<template>

<div class="container main-container users-admin-container">
    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>

    <div class="row item-list top-title">
      <div class="col-1">#</div>
      <div class="col-3">email</div>
      <div class="col-3">firstName</div>
      <div class="col-3">lastName</div>
      <div class="col-1 text-center">discout</div>
      <div class="col-1 text-center">delete</div>
    </div>


    <div class="row item-list"  v-for="(item,index) in users">
      <div class="col-1">{{index+1}}</div>
      <div class="col-3"> <router-link :to="{ name: 'AdminUser', params: {id: item.id } }">{{item.email}} </router-link></div>

      <div class="col-3">{{item.firstName}}</div>
      <div class="col-3">{{item.lastName}}</div>
      <div class="col-1 text-center">{{item.discount}}%</div>
      <div class="col-1 text-center"><a class="delete" v-on:click="deleteUser(item.id)">
          <icon name="trash-alt"></icon>
      </a></div>
    </div>


</div>

</template>

<script>

export default {
    name: 'AdminUsers',
    data() {
        return {
            users: [],
            infoMessage:'',

        }
    },
    methods: {
      deleteUser(id){
        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/users/'+id, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data:{
              id:id
            }
        }).then((response) => {
           this.usersList();
        })
      },
        usersList() {
                let token = localStorage.getItem('user-token') || '';

                this.axios(this.$config.API + '/users', {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).then((response) => {
                    this.users = response.data;
                })
            },


    },
    computed: {

    },
    created() {
        this.usersList();
    }

}

</script>
