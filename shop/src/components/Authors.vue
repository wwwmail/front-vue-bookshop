

<template>

    <ul class="author-list">
        <li class="author-title">Author list</li>
        <li v-for="item in authorList">
          <a v-on:click="getBooksByAuthor(item.id)">{{item.title}}</a>
        </li>
    </ul>

</template>

<script>
import Books from './Books'
export default {
    name: 'Authors',
    data() {
        return {

            authorList: [],

        }
    },
    computed: {},
    methods: {
        getAllAuthors() {

            fetch(this.$config.API + '/authors').then(function(response) {
                return response.json();
            }).then((response) => {
                this.authorList = response;
            });
        },

        getBooksByAuthor(id){
            this.$store.dispatch('getBooksByAuthor', id);
          console.log(id);
        }
    },
    created() {
        this.getAllAuthors();
    },
    components:{
      Books
    }
}

</script>
