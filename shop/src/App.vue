

<template>

<div id="app">

    <nav-bar></nav-bar>
    <router-view/>



</div>

</template>

<script>
import Books from './components/Books';
import Genres from './components/Genres';
import Authors from './components/Authors';
import NavBar from './components/NavBar';

export default {
    name: 'App',
    methods:{
      checkAuth: function(){
          this.$store.dispatch('checkAuth');
      },
      addCounter(){
        this.$store.dispatch('addCountCartItems');

      }
    },
    created() {

        this.checkAuth();

          this.addCounter();

    },
    components:{Books,Genres,Authors,NavBar}
}

</script>

<style>
html {
  height: 100%;
  width: 100%;
  background-color: #F2F2FA;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F2F2FA;
  height: 100%;
}
.main-container {
  background: #fff;
  box-shadow: #c0bfbf 0px 10px 8px;
  margin-bottom: 15px;
}
.navbar {
  background: #0994b3;
  border-bottom: 2px solid #0c7e97;
  margin-bottom: 15px;
}
.navbar a {
  color: #fff;
  padding-right: 25px;
}
.nav {
  display: block;
  width: 100%;
}
.navbar .float-right {
  padding-right: 0;
  padding-left: 25px;
}
.navbar a:not([href]):not([tabindex]) {
  color: #fff;
  cursor: pointer;
}
.navbar a:hover, .navbar a:focus {
  text-decoration: none;
}
.genres-list, .author-list {
  -webkit-box-shadow: 0 0 0 1px #e6e6e6;
  -moz-box-shadow: 0 0 0 1px #e6e6e6;
  box-shadow: 0 0 0 1px #e6e6e6;
  border-radius: 4px;
  margin-top: 15px;
}
.genres-list li a, .author-list li a {
  padding: 3px 10px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  -webkit-transition: all .2s;
  transition: all .2s;
}
.genres-list li a:hover, .genres-list li a:focus {
  background: #cff4e7;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.author-list li a:hover, .author-list li a:focus {
  background: #d9f8dd;
  -webkit-transition: all .3s;
  transition: all .3s;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.genres-title {
  background: #9feed1;
  padding: 2px 10px;
  text-transform: uppercase;
  font-size: 14px;
  border-bottom: 1px solid #86c2ac;
}
.author-title {
  background: #adf0b5;
  padding: 2px 10px;
  text-transform: uppercase;
  font-size: 14px;
  border-bottom: 1px solid #8cc393;
}
.book-list {
  margin-top: 15px;
}
.card {
  border: none;
  border-radius: 0;
  margin-bottom: 30px;
}
.card-body {
  border-radius: 4px;
  padding: 0;
  position: relative;
  -webkit-box-shadow: 0 0 0 1px #e6e6e6;
  -moz-box-shadow: 0 0 0 1px #e6e6e6;
  box-shadow: 0 0 0 1px #e6e6e6;
  -webkit-transition: all .2s;
  transition: all .2s;

}
.card-body:hover {
  -webkit-box-shadow: 0 0 0 1px #e0e0e0, 0 0 7px 0 #e0e0e0;
  -moz-box-shadow: 0 0 0 1px #e0e0e0, 0 0 7px 0 #e0e0e0;
  box-shadow: 0 0 0 1px #e0e0e0, 0 0 7px 0 #e0e0e0;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.card-img {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 20px;
  background: #e9e8e8;
  border-radius: 0;
  border: none;
}
.card-contant {
  padding: 5px 10px 40px 10px;
  font-size: 14px;
  display: inline-block;
}
.card-title {
  margin-bottom: 0;
  font-weight: 600;
  font-size: 14px;
}
.card-discount {
  background: #dc0a14;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 11px;
  color: #fff;
}
.card-price {
  font-size: 18px;
  color: #22973c;
  font-weight: bold;
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.btn-style{
  font-size: 14px;
  background: #0994b3;
  color: #fff;
  padding: 3px 10px;
  -webkit-box-shadow: 0 1px 0 #0a778f;
  box-shadow: 0 1px 0 #0a778f;
  border: 1px solid #0b87a2;
}
.btn-add-cart {
  float: right;
  margin-top: 2px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.btn-style:hover, .btn-style:focus {
  opacity: 0.8;
}
.btn {
  -webkit-transition: all .2s;
  transition: all .2s;
}
.btn:hover, .btn:focus {
  -webkit-transition: all .3s;
  transition: all .3s;
}
.card-genre {
  text-decoration: underline;
}
.b-b {
  border-bottom: 1px solid #ccc;
}
.minus, .plus {
  border: 1px solid #666;
  width: 15px;
  height: 15px;
  line-height: 10px;
  text-align: center;
  border-radius: 50%;
  margin: 0 5px;
  margin-top: 5px;
  color: #666;
  cursor: pointer;
  display: inline-block;
}
.plus {
  line-height: 12px;
}

.item-list{
  padding: 10px;
}
.top-title {
  background: #9feed1;
  border-bottom: 1px solid #86c2ac;
  line-height: 30px;
  vertical-align: middle;
}
.fw-b {
  font-weight: bold;
}
.cart-contetnt {
  line-height: 25px;
}
.cart-contetnt  a.delete, .cart-contetnt  a.delete:hover, .cart-contetnt  a.delete:focus, .books-container-admin a.delete, .books-container-admin  a.delete:hover, .books-container-admin  a.delete:focus,
.users-admin-container a.delete, .users-admin-container  a.delete:hover, .users-admin-container  a.delete:focus{
  color: #e80101;
  cursor: pointer;
}
.cart-contetnt .row div{
  padding: 10px 15px;
}
.payments-type {
  margin-left: 15px;
  height: 32px;
  border-radius: 4px;
  padding: 0 10px;
}
.btn-create-order {
  font-size: 16px;
}
.title-register, .title-login, .title-current, .title-current-user, .title-current-order {
  width: 100%;
  border-bottom: 1px solid #d7d7d7;
  padding: 10px 0;
  margin: 0;
}
.btn-register, .btn-login {
  padding: 4px 40px;
  font-size: 16px;
  margin-bottom: 20px;
}
.register-container label, .login-container label {
  line-height: 38px;
}
.register-container .form-group .input-group, .login-container .form-group .input-group{
  position: relative;
}
.register-container .form-group .input-group-addon, .login-container .form-group .input-group-addon{
  position: absolute;
  z-index: 9;
  left: 9px;
  top: 5px;
  color: #969696;
}
.register-container .form-group .form-control, .login-container .form-group .form-control{
  padding-left: 35px;
}
.btn-update-book {
  font-size: 16px;
  padding: 7px 15px;
}
.update-authors, .update-book {
  border-bottom: 1px solid #d2d2d2;
  padding-bottom: 20px;
}
.update-genres {
  padding-bottom: 20px;
}
.genre-admin-container .btn-style, .author-admin-container .btn-style, .user-admin-container .btn-style{
  font-size: 16px;
  padding: 6px 15px;
  margin-right: 10px;
}
.btn-delete-genre, .btn-delete-order{
  background: #f4f4f4;
  color: #e80101;
  border-color: #ced4da;
  -webkit-box-shadow: 0 1px 0 #e1e1e1;
  box-shadow: 0 1px 0 #e1e1e1;
}
.user-admin-container {
  padding-bottom: 20px;
}
.item-status .form-control {
  width: 50%;
  float: left;
  margin-left: 10px;
}
.item-status .btn-style {
  font-size: 16px;
  padding: 5px 10px;
  margin-left: 15px;
}
.btn-delete-order {
  font-size: 16px;
  padding: 5px 10px;
}
</style>
