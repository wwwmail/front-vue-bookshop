<style>



</style>

<template>

<div class="container main-container user-admin-container">
  <div class="row">
    <h1 class="title-current-user text-center">current user {{$route.params.id}}</h1>
  </div>
    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>

    <div class="row item-list">
      <div class="col-3">email</div>
      <div class="col-9"><input class="form-control" v-model="user.email"></div>

    </div>
    <div class="row item-list">
      <div class="col-3">firstName</div>
      <div class="col-9"><textarea class="form-control" v-model="user.first_name"></textarea></div>
    </div>

    <div class="row item-list">
      <div class="col-3">lastName</div>
      <div class="col-9"><input class="form-control" v-model="user.last_name"></div>
    </div>

    <div class="row item-list">
      <div class="col-3">discount</div>
      <div class="col-9"><input class="form-control" v-model="user.user_discount "></div>
    </div>

    <div class="row">
      <div class="col-12"><button class="btn btn-style" v-on:click="updateuser">Update user</button></div>
    </div>


</div>

</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
    name: 'Adminuser',
    data() {
        return {
            user: [],
            infoMessage:'',
            authors:[],
            value: [],
            genre:[],
            genres:[],
        options: [
          { title: 'Vue.js', id: 'vu' },
          { name: 'Javascript', code: 'js' },
          { name: 'Open Source', code: 'os' }
        ]

        }
    },
    methods: {
      updateuser(){
        let token = localStorage.getItem('user-token') || '';
        let id = this.$route.params.id;
        this.axios(this.$config.API + '/users', {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data:{
              data:this.user
            }
        }).then((response) => {
           this.getuser();
        })
      },
      removeGenre(id, obj){
        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/userToGenre', {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: {
                user_id: this.user.id,
                author_id:obj.id
            }
        }).then((response) => {
          this.getuser();

        })
      },
      removeAuthor(id, obj){

        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/userToAuthor', {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: {
                user_id: this.user.id,
                author_id:obj.id
            }
        }).then((response) => {
          this.getuser();

        })
        console.log(id);
        console.log(obj.id);
      },
        getuser() {
                let token = localStorage.getItem('user-token') || '';
                let id = this.$route.params.id;
                this.axios(this.$config.API + '/users/'+ id, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).then((response) => {
                    this.user = response.data;
                })
            },
            getAuthorsByuser(){
              let token = localStorage.getItem('user-token') || '';
              let id = this.$route.params.id;

              this.axios(this.$config.API + '/authors?user='+id, {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              }).then((response) => {
                  this.value = response.data;
                  console.log(this.value);
              })
            },

            getGenresByuser(){
              let token = localStorage.getItem('user-token') || '';
              let id = this.$route.params.id;

              this.axios(this.$config.API + '/genres?user='+id, {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              }).then((response) => {
                  this.genre = response.data;
                  console.log(this.value);
              })
            },

            getAuthors(){
              let token = localStorage.getItem('user-token') || '';

              this.axios(this.$config.API + '/authors', {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              }).then((response) => {
                  this.authors = response.data;
                  console.log(this.authors);
              })
            },

            getGenres(){
              let token = localStorage.getItem('user-token') || '';

              this.axios(this.$config.API + '/genres', {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              }).then((response) => {
                  this.genres = response.data;
                  console.log(this.authors);
              })
            },

            addTag (newTag) {
              alert(newTag);
             const tag = {
               name: newTag,
               code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
             }
             console.log(newTag);
             this.options.push(tag)
             this.value.push(tag)
           },

           addAuthorTouser(){
             let token = localStorage.getItem('user-token') || '';
             let id = this.$route.params.id;
             this.axios(this.$config.API + '/userToAuthor', {
                 method: "POST",
                 headers: {
                     'Authorization': 'Bearer ' + token,
                 },
                 data:{
                   data:this.value,
                   user_id: id
                 }
             }).then((response) => {
                this.getuser();
             })
           },

           addGenreTouser(){
             let token = localStorage.getItem('user-token') || '';
             let id = this.$route.params.id;
             this.axios(this.$config.API + '/userToGenre', {
                 method: "POST",
                 headers: {
                     'Authorization': 'Bearer ' + token,
                 },
                 data:{
                   data:this.genre,
                   user_id: id
                 }
             }).then((response) => {
                this.getuser();
             })
           }


    },
    computed: {

    },
    created() {
        this.getuser();
        this.getAuthors();
        this.getGenres();
        this.getAuthorsByuser();
        this.getGenresByuser();
    },
     components: { Multiselect },

}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
