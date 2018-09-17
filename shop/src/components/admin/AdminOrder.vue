<style>



</style>

<template>

<div class="container main-container">
  <h1>current order {{$route.params.id}}</h1>

    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>

<div class="row item-list">
  <div class="col-3">User name</div>
  <div class="col-9">{{user.first_name}} {{user.last_name}}</div>

</div>

<div class="row item-list">
  <div class="col-1">#</div>
  <div class="col-2">order_id</div>
  <div class="col-3">book_id</div>
  <div class="col-3">book_price</div>
  <div class="col-2">title_book</div>
  <div class="col-1">count</div>

</div>

<div v-for="(order, index) in orders">
    <div class="row item-list">
      <div class="col-1">{{index+1}}</div>
      <div class="col-2">{{order.order_id}}</div>
      <div class="col-3">{{order.book_id}}</div>
      <div class="col-3">{{order.book_price}}</div>
      <div class="col-2">{{order.title_book}}</div>
      <div class="col-1">{{order.count}}</div>


    </div>

</div>



</div>

</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
    name: 'Adminorder',
    data() {
        return {
            orders: [],
            user:{},
            infoMessage: '',
        }
    },
    methods: {



        getorder() {
                let token = localStorage.getItem('user-token') || '';
                let id = this.$route.params.id;
                this.axios(this.$config.API + '/orders/'+ id, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).then((response) => {
                  console.log(response);
                    //this.order = response.data;

                    this.getUser(response.data.user_id);
                })
            },
            getOrderDetail(){
                let token = localStorage.getItem('user-token') || '';
              let id = this.$route.params.id;
              this.axios(this.$config.API + '/orderDetail?order='+ id, {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              }).then((response) => {
                  this.orders = response.data;


              })

            },
            getUser(id){
              console.log(id);
              let token = localStorage.getItem('user-token') || '';

              this.axios(this.$config.API + '/users/'+ id, {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              }).then((response) => {
                  this.user = response.data;
                  console.log(this.user);


              })
            },











    },
    computed: {

    },
    created() {
        this.getorder();
        this.getOrderDetail();
    },
     components: { Multiselect },

}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
