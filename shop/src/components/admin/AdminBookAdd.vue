<style>



</style>

<template>

<div class="container main-container">
  <h1>Add Book</h1>

    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>

    <div class="row item-list">
      <div class="col-3">title</div>
      <div class="col-9"><input class="form-control" v-model="book.title"></div>

    </div>
    <div class="row item-list">
      <div class="col-3">desscription</div>
      <div class="col-9"><textarea class="form-control" v-model="book.description"></textarea></div>
    </div>

    <div class="row item-list">
      <div class="col-3">price</div>
      <div class="col-9"><input class="form-control" v-model="book.price"></div>
    </div>

    <div class="row item-list">
      <div class="col-3">discount</div>
      <div class="col-9"><input class="form-control" v-model="book.discount"></div>
    </div>



    <div class="row item-list">
      <div class="col-3">authors</div>
      <div class="col-9">{{book.author}}</div>
    </div>
    <div class="row item-list">
      <div class="col-8">
      <multiselect v-model="value" tag-placeholder="Add author to book"  placeholder="Search or add a tag" label="title" track-by="id"  :options="authors" :multiple="true" :taggable="true" @tag="addTag">

        <template slot="tag" slot-scope="props"><span class="multiselect__tag"><span>{{ props.option.title }}</span><i class="multiselect__tag-icon" @click="props.remove(props.option)"></i></span></template>
      </multiselect>

    </div>
    <div class="col-4">
      <!-- <button class="btn" v-on:click="addAuthorToBook()"> add author</button> -->
    </div>
    </div>

    <div class="row item-list">
      <div class="col-3">genres</div>
      <div class="col-9">{{book.genre}}</div>
    </div>
    <div class="row item-list">
      <div class="col-8">
      <multiselect v-model="genre" tag-placeholder="Add genre to book"  placeholder="Search and add genre" label="title" track-by="id"  :options="genres" :multiple="true" :taggable="true" @tag="addTag">

        <template slot="tag" slot-scope="props"><span class="multiselect__tag"><span>{{ props.option.title }}</span><i class="multiselect__tag-icon" @click="props.remove(props.option)"></i></span></template>
      </multiselect>

    </div>
    <div class="col-4">
      <!-- <button class="btn" v-on:click="addGenreToBook()"> add genre</button> -->
    </div>
    </div>
    <div class="row">
      <div class="col-12"><button class="btn" v-on:click="addBook">Add Book</button></div>
    </div>
</div>

</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
    name: 'AdminBook',
    data() {
        return {
            book: {
              title:'',
              price:'',
              discount:'',
              description:'',
            },
            bookId:false,
            infoMessage:'',
            authors:[],
            value: [],
            genre:[],
            genres:[],


        }
    },
    methods: {
      addBook(){
        let token = localStorage.getItem('user-token') || '';
        let id = this.$route.params.id;
        this.axios(this.$config.API + '/books', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data:{
              data:this.book
            }
        }).then((response) => {
          this.addAuthorToBook(response.data.id);
          this.addGenreToBook(response.data.id);
          console.log(response.data.id);
          this.bookId = response.data.id;
           // this.getBook();
        })


        console.log(this.bookId);
      },
getBook(){},

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

           addAuthorToBook(id){
             let token = localStorage.getItem('user-token') || '';

             this.axios(this.$config.API + '/bookToAuthor', {
                 method: "POST",
                 headers: {
                     'Authorization': 'Bearer ' + token,
                 },
                 data:{
                   data:this.value,
                   book_id: id
                 }
             }).then((response) => {
                this.getBook();
             })
           },

           addGenreToBook(id){
             let token = localStorage.getItem('user-token') || '';

             this.axios(this.$config.API + '/bookToGenre', {
                 method: "POST",
                 headers: {
                     'Authorization': 'Bearer ' + token,
                 },
                 data:{
                   data:this.genre,
                   book_id: id
                 }
             }).then((response) => {
                this.getBook();
             })
           }


    },
    computed: {

    },
    created() {
        this.getBook();
        this.getAuthors();
        this.getGenres();

    },
     components: { Multiselect },

}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
