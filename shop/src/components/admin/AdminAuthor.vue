<style>


</style>

<template>

<div class="container main-container">
<div class="row">
  <div class="col-12">{{infoMessage}}</div>
</div>
  <div class="row item-list" >
      <div class="col-6" >

        <input v-model="author" class="form-control" >
        {{addMessage}}
      </div>
      <div class="col-6">
        <button class="btn primary" v-on:click="addAuthor">add author</button>
      </div>

  </div>
    <div class="row item-list" v-for="item in authors">

        <div class="col-6" >
          <input class="form-control"  v-model="item.title"   >
        </div>
        <div class="col-1">
          <button class="btn" v-on:click="updateAuthor(item.id, item.title)">chenge</button>
        </div>
        <div class="col-1">
            <button class="btn" v-on:click="deleteAuthor(item.id)">  <icon name="trash-alt"></icon></button>
        </div>
        <div class="col-4">

        </div>

  </div>




</div>

</template>

<script>


export default {
    name: 'AdminAuthor',
    data(){
      return{
        authors:[],
        author:'',
        addMessage:'',
        infoMessage:'',
        inputParams: []
      }
    },
    methods:{
      authorsList(){
        let token = localStorage.getItem('user-token') || '';

         this.axios(this.$config.API + '/authors', {
                method: "GET",
                 headers: {'Authorization': 'Bearer ' + token,},
             }).then((response) => {
               this.authors = response.data;
         })
      },
      addAuthor(){
        if(!this.author){
          this.addMessage = 'Field shouldn\'t be empty';
          return false;
        }

        let token = localStorage.getItem('user-token') || '';

         this.axios(this.$config.API + '/authors', {
                method: "POST",
                 headers: {'Authorization': 'Bearer ' + token,},
                 data:{
                   title:this.author
                 }
             }).then((response) => {
               if(response.data.success == 'true'){
                 this.author  = '';
               }
               this.infoMessage = response.data.message;
               this.authorsList();
         })

      },

      deleteAuthor(id){
        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/authors', {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: {
                id: id,
            }
        }).then((response) => {
          this.infoMessage = response.data.message;
            this.authorsList();
        })
      },

      updateAuthor(id, title){


        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/authors', {
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
            this.authorsList();

        })
      }
    },
    computed:{

    },
    created(){
      this.authorsList();
    }

}

</script>
