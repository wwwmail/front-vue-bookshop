<style>


</style>

<template>

<div class="container main-container">
<div class="row">
  <div class="col-12">{{infoMessage}}</div>
</div>
  <div class="row item-list" >
      <div class="col-6" >

        <input v-model="genre" class="form-control" >
        {{addMessage}}
      </div>
      <div class="col-6">
        <button class="btn primary" v-on:click="addGenre">add genre</button>
      </div>

  </div>
    <div class="row item-list" v-for="item in genres">

        <div class="col-6" >
          <input class="form-control"  v-model="item.title"   >
        </div>
        <div class="col-1">
          <button class="btn" v-on:click="updateGenre(item.id, item.title)">chenge</button>
        </div>
        <div class="col-1">
            <button class="btn" v-on:click="deleteGenre(item.id)">  <icon name="trash-alt"></icon></button>
        </div>
        <div class="col-4">

        </div>

  </div>




</div>

</template>

<script>


export default {
    name: 'AdminGenre',
    data(){
      return{
        genres:[],
        genre:'',
        addMessage:'',
        infoMessage:'',
        inputParams: []
      }
    },
    methods:{
      genresList(){
        let token = localStorage.getItem('user-token') || '';

         this.axios(this.$config.API + '/genres', {
                method: "GET",
                 headers: {'Authorization': 'Bearer ' + token,},
             }).then((response) => {
               this.genres = response.data;
         })
      },
      addGenre(){
        if(!this.genre){
          this.addMessage = 'Field shouldn\'t be empty';
          return false;
        }

        let token = localStorage.getItem('user-token') || '';

         this.axios(this.$config.API + '/genres', {
                method: "POST",
                 headers: {'Authorization': 'Bearer ' + token,},
                 data:{
                   title:this.genre
                 }
             }).then((response) => {
               if(response.data.success == 'true'){
                 this.genre  = '';
               }
               this.infoMessage = response.data.message;
               this.genresList();
         })

      },

      deleteGenre(id){
        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/genres', {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: {
                id: id,
            }
        }).then((response) => {
          this.infoMessage = response.data.message;
            this.genresList();
        })
      },

      updateGenre(id, title){


        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/genres', {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: {
                id: id,
                title:title,
            }
        }).then((response) => {
            this.infoMessage = response.data.message;
            this.genresList();

        })
      }
    },
    computed:{

    },
    created(){
      this.genresList();
    }

}

</script>
