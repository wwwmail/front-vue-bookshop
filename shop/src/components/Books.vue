

<template>

<div class="book-list row">
    <div v-for="item in booklist" class="card col-4">
        <div class="card-body">
          <div class="card-img"><icon name="book"></icon></div>
            <div class="card-contant">
                <div class="card-title"><router-link :to="{ name: 'Book', params: {id:item.id} }">{{item.title}}</router-link> id: {{item.id}}</div>
                <div class="card-description">{{item.description}}</div>
                <div class="card-genre">{{item.genre}}</div>
                <div class="card-author">{{item.author}}</div>
                <div v-if="item.discount" class="card-discount">{{item.discount}}%</div>
                <div class="card-price">{{item.price}} $</div>
                <span class="btn btn-style btn-add-cart" v-on:click="addToCart(item.id)"  v-if="isAuth" >Add to cart</span>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    name: 'Books',
    data() {
        return {
          
        }
    },
    computed: {
        booklist() {
          return this.$store.state.booksList;
        },
        isAuth(){
          return this.$store.state.isAuth;
        }
    },
    methods: {
        getAllBooks() {
          this.$store.dispatch('getAllBooks');
        },
        addToCart(id){

          let token = localStorage.getItem('user-token') || '';

           this.axios(this.$config.API + '/cart', {
                  method: "POST",
                   headers: {'Authorization': 'Bearer ' + token,},
                   data: {
                     book_id: id
                   }
               }).then((response) => {
                 this.addCounter();
                 console.log(response);

                 if(response.data.success == 'true'){
                  // this.setLogout();
                   //commit('set', {type: 'isAuth', items: true});
                 }

           })
        },

        addCounter(){
          this.$store.dispatch('addCountCartItems');

        }

    },
    created() {
        this.getAllBooks();
    }
}

</script>
