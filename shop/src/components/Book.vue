

<template>

<div class="container main-container">
    <div class="row">
      <div class="col-2"></div>
        <div class="card col-8 book-list ">
            <div class="card-body">
                <div class="card-img">
                    <icon name="book"></icon>
                </div>
                <div class="card-contant">
                    <div class="card-title">{{book.title}} id: {{book.id}}</div>

                    <div class="card-genre">{{book.genre}}</div>
                    <div class="card-author">{{book.author}}</div>
                    <div v-if="book.discount" class="card-discount">{{book.discount}}%</div>
                    <div class="card-price">{{book.price}} $</div>
                    <div class="card-description">{{book.description}}</div>
                    <span class="btn btn-add-cart" v-on:click="addToCart(book.id)" v-if="isAuth">Add to cart</span>
                </div>
            </div>
        </div>
        <div class="col-2"></div>
    </div>
</div>

</template>

<script>

export default {
    name: 'Books',
    data() {
        return {
            book: {}
        }
    },
    computed: {
        isAuth() {
            return this.$store.state.isAuth;
        }
    },
    methods: {
        getBook() {
                let token = localStorage.getItem('user-token') || '';
                let id = this.$route.params.id;

                this.axios(this.$config.API + '/books/' + id, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {

                    this.book = response.data;
                })

            },
            addToCart(id) {

                let token = localStorage.getItem('user-token') || '';

                this.axios(this.$config.API + '/cart', {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        book_id: id
                    }
                }).then((response) => {
                    this.addCounter();
                    console.log(response);

                    if (response.data.success == 'true') {
                        // this.setLogout();
                        //commit('set', {type: 'isAuth', items: true});
                    }

                })
            },

            addCounter() {
                this.$store.dispatch('addCountCartItems');

            }

    },
    created() {
        this.getBook();
    }
}

</script>
