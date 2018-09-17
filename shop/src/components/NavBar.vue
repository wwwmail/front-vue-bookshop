

<template>

        <nav class="navbar" v-if="isAdmin">
          <div class="container">
              <div class="nav">
                <router-link to="/admin/books">Books</router-link>
                  <router-link to="/admin/genre">Genres</router-link>
                  <router-link to="/admin/author">Authors</router-link>
                  <router-link to="/admin/users">Users</router-link>
                  <router-link to="/admin/orders">Orders</router-link>
                  <logout></logout>

              </div>
          </div>
        </nav>
        <nav class="navbar" v-else-if="isAuth">
            <div class="container">
                <div class="nav">
                    <router-link to="/">Home</router-link>
                    <router-link to="/cart">Cart</router-link>
                    <logout></logout>
                    <header-cart></header-cart>
                </div>
            </div>
        </nav>
        <nav class="navbar" v-else>
            <div class="container">
                <div class="nav">
                    <router-link to="/">Home</router-link>
                    <router-link to="/cart">Cart</router-link>
                    <router-link to="/login" class="float-right"><icon name="sign-in-alt"></icon></router-link>
                    <router-link to="/sign-up" class="float-right"><icon name="user-circle"></icon></router-link>
                </div>
            </div>
        </nav>





</template>

<script>

import Logout from './Logout'
import HeaderCart from './HeaderCart'
export default {
    name: 'NavBar',
    data() {
        return {

        }
    },
    computed: {
        isAuth() {
            return this.$store.state.isAuth;
        },
        isAdmin(){
          return this.$store.state.isAdmin;
        }
    },
    components: {
        Logout,HeaderCart
    }
}

</script>
