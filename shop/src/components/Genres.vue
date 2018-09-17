

<template>

    <ul class="genres-list">
        <li class="genres-title">Genre list</li>
        <li v-for="item in genreList">
          <a v-on:click="getBooksByGenre(item.id)">{{item.title}}</a>
        </li>
    </ul>

</template>

<script>

export default {
    name: 'Genres',
    data() {
        return {

            genreList: [],

        }
    },
    computed: {},
    methods: {
        getAllGenres() {

            fetch(this.$config.API + '/genres').then(function(response) {
                return response.json();
            }).then((response) => {
                this.genreList = response;
            });
        },
        getBooksByGenre(id){
            this.$store.dispatch('getBooksByGenre', id);
          console.log(id);
        }
    },
    created() {
        this.getAllGenres();
    }
}

</script>
