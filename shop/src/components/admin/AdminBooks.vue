<style>



</style>

<template>

<div class="container main-container">
    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>

    <div class="row item-list">
      <div class="col-1">#</div>
      <div class="col-2">title</div>
      <div class="col-3">genre</div>
      <div class="col-3">author</div>
      <div class="col-1">price</div>
      <div class="col-1">discount</div>
      <div class="col-1"></div>
    </div>


    <div class="row item-list"  v-for="(item,index) in books">
      <div class="col-1">{{index+1}}</div>
      <div class="col-2">  <router-link :to="{ name: 'AdminBook', params: {id: item.id } }">{{item.title}}</router-link></div>
      <div class="col-3">{{item.genre}}</div>
      <div class="col-3">{{item.author}}</div>
      <div class="col-1">{{item.price}}</div>
      <div class="col-1">{{item.discount}}</div>
      <div class="col-1"><p v-on:click="deleteBook(item.id)">
          <icon name="trash-alt"></icon>
      </p></div>
    </div>


</div>

</template>

<script>

export default {
    name: 'AdminBooks',
    data() {
        return {
            books: [],
            infoMessage: '',

        }
    },
    methods: {
      deleteBook(id){
        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/books/'+id, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data:{
              id:id
            }
        }).then((response) => {
           this.booksList();
        })
      },
        booksList() {
                let token = localStorage.getItem('user-token') || '';

                this.axios(this.$config.API + '/books', {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).then((response) => {
                    this.books = response.data;
                })
            },


    },
    computed: {

    },
    created() {
        this.booksList();
    }

}

</script>
