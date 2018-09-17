<style>



</style>

<template>

<div class="container main-container">
  <h1>current book {{$route.params.id}}</h1>

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

    <div class="row">
      <div class="col-12"><button class="btn" v-on:click="updateBook">Update Book</button></div>
    </div>

    <div class="row item-list">
      <div class="col-3">authors</div>
      <div class="col-9">{{book.author}}</div>
    </div>
    <div class="row item-list">
      <div class="col-8">
      <multiselect v-model="value" tag-placeholder="Add author to book"  placeholder="Search or add a tag" label="title" track-by="id"  :options="authors" :multiple="true" :taggable="true" @tag="addTag">

        <template slot="tag" slot-scope="props"><span class="multiselect__tag"><span>{{ props.option.title }}</span><i class="multiselect__tag-icon" @click="removeAuthor(props.remove(props.option) , props.option)"></i></span></template>
      </multiselect>

    </div>
    <div class="col-4">
      <button class="btn" v-on:click="addAuthorToBook()"> add author</button>
    </div>
    </div>

    <div class="row item-list">
      <div class="col-3">genres</div>
      <div class="col-9">{{book.genre}}</div>
    </div>
    <div class="row item-list">
      <div class="col-8">
      <multiselect v-model="genre" tag-placeholder="Add genre to book"  placeholder="Search and add genre" label="title" track-by="id"  :options="genres" :multiple="true" :taggable="true" @tag="addTag">

        <template slot="tag" slot-scope="props"><span class="multiselect__tag"><span>{{ props.option.title }}</span><i class="multiselect__tag-icon" @click="removeGenre(props.remove(props.option) , props.option)"></i></span></template>
      </multiselect>

    </div>
    <div class="col-4">
      <button class="btn" v-on:click="addGenreToBook()"> add genre</button>
    </div>
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





</div>

</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
    name: 'AdminBook',
    data() {
        return {
            book: [],
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
      updateBook(){
        let token = localStorage.getItem('user-token') || '';
        let id = this.$route.params.id;
        this.axios(this.$config.API + '/books', {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data:{
              data:this.book
            }
        }).then((response) => {
           this.getBook();
        })
      },
      removeGenre(id, obj){
        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/bookToGenre', {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: {
                book_id: this.book.id,
                author_id:obj.id
            }
        }).then((response) => {
          this.getBook();

        })
      },
      removeAuthor(id, obj){

        let token = localStorage.getItem('user-token') || '';

        this.axios(this.$config.API + '/bookToAuthor', {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: {
                book_id: this.book.id,
                author_id:obj.id
            }
        }).then((response) => {
          this.getBook();

        })
        console.log(id);
        console.log(obj.id);
      },
        getBook() {
                let token = localStorage.getItem('user-token') || '';
                let id = this.$route.params.id;
                this.axios(this.$config.API + '/books/'+ id, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).then((response) => {
                    this.book = response.data;
                })
            },
            getAuthorsByBook(){
              let token = localStorage.getItem('user-token') || '';
              let id = this.$route.params.id;

              this.axios(this.$config.API + '/authors?book='+id, {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              }).then((response) => {
                  this.value = response.data;
                  console.log(this.value);
              })
            },

            getGenresByBook(){
              let token = localStorage.getItem('user-token') || '';
              let id = this.$route.params.id;

              this.axios(this.$config.API + '/genres?book='+id, {
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

           addAuthorToBook(){
             let token = localStorage.getItem('user-token') || '';
             let id = this.$route.params.id;
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

           addGenreToBook(){
             let token = localStorage.getItem('user-token') || '';
             let id = this.$route.params.id;
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
        this.getAuthorsByBook();
        this.getGenresByBook();
    },
     components: { Multiselect },

}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
