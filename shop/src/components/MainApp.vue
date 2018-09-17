<style>

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

}

</style>

<template>

<div class="container main-container">
  <div id="main-app">
    <div class="row">
      <div class="col-3">

        <genres></genres>

        <authors></authors>
      </div>
      <div class="col-9">
        <books></books>
      </div>

    </div>
  </div>




</div>

</template>

<script>
import Books from './Books';
import Genres from './Genres';
import Authors from './Authors';

export default {
    name: 'MainApp',
    components:{Books,Genres,Authors}
}

</script>
