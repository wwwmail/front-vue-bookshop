

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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F2F2FA;
}
.main-container {
  background: #fff;
  box-shadow: #c0bfbf 0px 10px 8px;
  border-left: 1px solid #d4d4d4;
  border-right: 1px solid #d4d4d4;
}
.navbar {
  background: #0994b3;
  border-bottom: 2px solid #0c7e97;
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
.btn-add-cart {
  float: right;
  font-size: 14px;
  background: #0994b3;
  color: #fff;
  padding: 3px 10px;
  margin-top: 2px;
  -webkit-box-shadow: 0 1px 0 #0a778f;
  box-shadow: 0 1px 0 #0a778f;
  border: 1px solid #0b87a2;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.btn-add-cart:hover, .btn-add-cart:focus {
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
}
.plus {
  line-height: 12px;
}

.item-list{
  padding: 10px;
}
</style>
